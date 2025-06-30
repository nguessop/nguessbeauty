/*
  # Fonctions de recherche

  Fonctions pour optimiser les recherches de salons et services
*/

-- Fonction de recherche de salons avec filtres
CREATE OR REPLACE FUNCTION search_salons(
  search_query text DEFAULT '',
  city_filter uuid DEFAULT NULL,
  category_filter uuid DEFAULT NULL,
  price_range_filter text DEFAULT '',
  min_rating decimal DEFAULT 0,
  latitude decimal DEFAULT NULL,
  longitude decimal DEFAULT NULL,
  radius_km integer DEFAULT 10,
  limit_results integer DEFAULT 20,
  offset_results integer DEFAULT 0
)
RETURNS TABLE (
  salon_id uuid,
  salon_name varchar,
  salon_description text,
  salon_address text,
  city_name varchar,
  district_name varchar,
  salon_rating decimal,
  salon_review_count integer,
  salon_price_range varchar,
  distance_km decimal,
  min_service_price decimal,
  max_service_price decimal,
  total_services integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.description,
    s.address,
    c.name,
    d.name,
    s.rating,
    s.review_count,
    s.price_range,
    CASE 
      WHEN latitude IS NOT NULL AND longitude IS NOT NULL AND s.latitude IS NOT NULL AND s.longitude IS NOT NULL
      THEN ROUND(
        (6371 * acos(
          cos(radians(latitude)) * cos(radians(s.latitude)) * 
          cos(radians(s.longitude) - radians(longitude)) + 
          sin(radians(latitude)) * sin(radians(s.latitude))
        ))::numeric, 2
      )
      ELSE NULL
    END,
    COALESCE(MIN(srv.price), 0),
    COALESCE(MAX(srv.price), 0),
    COUNT(srv.id)::integer
  FROM salons s
  LEFT JOIN cities c ON s.city_id = c.id
  LEFT JOIN districts d ON s.district_id = d.id
  LEFT JOIN services srv ON s.id = srv.salon_id AND srv.is_active = true
  LEFT JOIN service_categories sc ON srv.category_id = sc.id
  WHERE 
    s.status = 'active' 
    AND s.is_verified = true
    AND (search_query = '' OR s.name ILIKE '%' || search_query || '%' OR s.description ILIKE '%' || search_query || '%')
    AND (city_filter IS NULL OR s.city_id = city_filter)
    AND (category_filter IS NULL OR srv.category_id = category_filter)
    AND (price_range_filter = '' OR s.price_range = price_range_filter)
    AND s.rating >= min_rating
    AND (
      latitude IS NULL OR longitude IS NULL OR s.latitude IS NULL OR s.longitude IS NULL OR
      (6371 * acos(
        cos(radians(latitude)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians(longitude)) + 
        sin(radians(latitude)) * sin(radians(s.latitude))
      )) <= radius_km
    )
  GROUP BY s.id, s.name, s.description, s.address, c.name, d.name, s.rating, s.review_count, s.price_range, s.latitude, s.longitude
  HAVING COUNT(srv.id) > 0 OR category_filter IS NULL
  ORDER BY 
    CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN distance_km END ASC,
    s.rating DESC,
    s.review_count DESC
  LIMIT limit_results
  OFFSET offset_results;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour vérifier la disponibilité d'un créneau
CREATE OR REPLACE FUNCTION check_availability(
  salon_id_param uuid,
  service_id_param uuid,
  staff_id_param uuid,
  booking_date_param date,
  booking_time_param time,
  duration_minutes_param integer
)
RETURNS boolean AS $$
DECLARE
  end_time time;
  conflict_count integer;
BEGIN
  -- Calculer l'heure de fin
  end_time := booking_time_param + (duration_minutes_param || ' minutes')::interval;
  
  -- Vérifier les conflits
  SELECT COUNT(*) INTO conflict_count
  FROM bookings
  WHERE 
    salon_id = salon_id_param
    AND (staff_id_param IS NULL OR staff_id = staff_id_param)
    AND booking_date = booking_date_param
    AND status IN ('confirmed', 'in_progress')
    AND (
      (booking_time <= booking_time_param AND end_time > booking_time_param) OR
      (booking_time < end_time AND end_time >= booking_time_param)
    );
  
  RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql;