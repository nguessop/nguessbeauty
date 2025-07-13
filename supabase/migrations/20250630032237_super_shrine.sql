/*
  # Vues pour les analyses et statistiques

  Vues pour faciliter les requêtes d'analyse et de reporting
*/

-- Vue des statistiques des salons
CREATE OR REPLACE VIEW salon_analytics AS
SELECT 
  s.id,
  s.name,
  s.city_id,
  s.status,
  s.rating,
  s.review_count,
  
  -- Statistiques de réservations
  COUNT(b.id) as total_bookings,
  COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_bookings,
  COUNT(CASE WHEN b.status = 'cancelled' THEN 1 END) as cancelled_bookings,
  COUNT(CASE WHEN b.status = 'no_show' THEN 1 END) as no_show_bookings,
  
  -- Revenus
  COALESCE(SUM(CASE WHEN b.status = 'completed' THEN b.total_amount END), 0) as total_revenue,
  COALESCE(SUM(CASE WHEN b.status = 'completed' AND b.booking_date >= CURRENT_DATE - INTERVAL '30 days' THEN b.total_amount END), 0) as monthly_revenue,
  
  -- Moyennes
  ROUND(AVG(CASE WHEN b.status = 'completed' THEN b.total_amount END), 2) as avg_booking_value,
  
  -- Dates
  MIN(b.booking_date) as first_booking_date,
  MAX(b.booking_date) as last_booking_date

FROM salons s
LEFT JOIN bookings b ON s.id = b.salon_id
GROUP BY s.id, s.name, s.city_id, s.status, s.rating, s.review_count;

-- Vue des services populaires
CREATE OR REPLACE VIEW popular_services AS
SELECT 
  s.id,
  s.name,
  s.salon_id,
  sc.name as category_name,
  s.price,
  COUNT(b.id) as booking_count,
  COALESCE(SUM(b.total_amount), 0) as total_revenue,
  ROUND(AVG(r.service_rating), 2) as avg_rating,
  COUNT(r.id) as review_count
FROM services s
JOIN service_categories sc ON s.category_id = sc.id
LEFT JOIN bookings b ON s.id = b.service_id AND b.status = 'completed'
LEFT JOIN reviews r ON s.id = r.service_id AND r.is_verified = true
WHERE s.is_active = true
GROUP BY s.id, s.name, s.salon_id, sc.name, s.price
ORDER BY booking_count DESC;

-- Vue des créneaux disponibles (pour optimiser les recherches)
CREATE OR REPLACE VIEW available_time_slots AS
WITH RECURSIVE time_slots AS (
  SELECT '08:00'::time as slot_time
  UNION ALL
  SELECT (slot_time + interval '30 minutes')::time
  FROM time_slots
  WHERE slot_time < '18:00'::time
),
salon_hours AS (
  SELECT 
    s.id as salon_id,
    s.name as salon_name,
    generate_series(
      CURRENT_DATE,
      CURRENT_DATE + INTERVAL '30 days',
      INTERVAL '1 day'
    )::date as available_date
  FROM salons s
  WHERE s.status = 'active' AND s.is_verified = true
)
SELECT 
  sh.salon_id,
  sh.salon_name,
  sh.available_date,
  ts.slot_time,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM bookings b 
      WHERE b.salon_id = sh.salon_id 
      AND b.booking_date = sh.available_date 
      AND b.booking_time = ts.slot_time
      AND b.status IN ('confirmed', 'in_progress')
    ) THEN false
    ELSE true
  END as is_available
FROM salon_hours sh
CROSS JOIN time_slots ts
WHERE sh.available_date >= CURRENT_DATE;