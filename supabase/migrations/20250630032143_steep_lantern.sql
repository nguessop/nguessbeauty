/*
  # Table des avis et évaluations

  1. Table
    - `reviews` - Avis clients sur les salons et services
  
  2. Sécurité
    - Enable RLS
    - Les clients peuvent créer des avis pour leurs réservations terminées
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relations
  client_id uuid NOT NULL REFERENCES users(id),
  salon_id uuid NOT NULL REFERENCES salons(id),
  booking_id uuid REFERENCES bookings(id),
  service_id uuid REFERENCES services(id),
  staff_id uuid REFERENCES staff(id),
  
  -- Évaluation
  overall_rating integer NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  service_rating integer CHECK (service_rating >= 1 AND service_rating <= 5),
  staff_rating integer CHECK (staff_rating >= 1 AND staff_rating <= 5),
  cleanliness_rating integer CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  value_rating integer CHECK (value_rating >= 1 AND value_rating <= 5),
  
  -- Commentaire
  title varchar(255),
  comment text,
  
  -- Médias
  images jsonb DEFAULT '[]', -- URLs des images jointes
  
  -- Statut
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  is_anonymous boolean DEFAULT false,
  
  -- Réponse du salon
  salon_response text,
  salon_response_at timestamptz,
  salon_response_by uuid REFERENCES users(id),
  
  -- Métadonnées
  helpful_count integer DEFAULT 0,
  reported_count integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table pour les votes utiles sur les avis
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  vote_type varchar(10) NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_reviews_client ON reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_reviews_salon ON reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_service ON reviews(service_id);
CREATE INDEX IF NOT EXISTS idx_reviews_staff ON reviews(staff_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(overall_rating);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(is_verified);
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON review_votes(review_id);

-- Fonction pour mettre à jour les moyennes de notation
CREATE OR REPLACE FUNCTION update_ratings()
RETURNS TRIGGER AS $$
BEGIN
  -- Mettre à jour la note du salon
  UPDATE salons SET 
    rating = (
      SELECT ROUND(AVG(overall_rating)::numeric, 2)
      FROM reviews 
      WHERE salon_id = COALESCE(NEW.salon_id, OLD.salon_id) AND is_verified = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews 
      WHERE salon_id = COALESCE(NEW.salon_id, OLD.salon_id) AND is_verified = true
    )
  WHERE id = COALESCE(NEW.salon_id, OLD.salon_id);
  
  -- Mettre à jour la note du service si spécifié
  IF COALESCE(NEW.service_id, OLD.service_id) IS NOT NULL THEN
    UPDATE services SET 
      rating = (
        SELECT ROUND(AVG(service_rating)::numeric, 2)
        FROM reviews 
        WHERE service_id = COALESCE(NEW.service_id, OLD.service_id) AND is_verified = true AND service_rating IS NOT NULL
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews 
        WHERE service_id = COALESCE(NEW.service_id, OLD.service_id) AND is_verified = true
      )
    WHERE id = COALESCE(NEW.service_id, OLD.service_id);
  END IF;
  
  -- Mettre à jour la note du personnel si spécifié
  IF COALESCE(NEW.staff_id, OLD.staff_id) IS NOT NULL THEN
    UPDATE staff SET 
      rating = (
        SELECT ROUND(AVG(staff_rating)::numeric, 2)
        FROM reviews 
        WHERE staff_id = COALESCE(NEW.staff_id, OLD.staff_id) AND is_verified = true AND staff_rating IS NOT NULL
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews 
        WHERE staff_id = COALESCE(NEW.staff_id, OLD.staff_id) AND is_verified = true
      )
    WHERE id = COALESCE(NEW.staff_id, OLD.staff_id);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour les moyennes
CREATE TRIGGER trigger_update_ratings_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_ratings();

CREATE TRIGGER trigger_update_ratings_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_ratings();

CREATE TRIGGER trigger_update_ratings_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_ratings();

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read verified reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (is_verified = true);

CREATE POLICY "Clients can read their reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create reviews for their completed bookings"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_id AND b.client_id = auth.uid() AND b.status = 'completed'
    )
  );

CREATE POLICY "Salon owners can read their salon reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can vote on reviews"
  ON review_votes
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());