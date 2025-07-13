/*
  # Programme de fidélité

  1. Tables
    - `loyalty_transactions` - Transactions de points de fidélité
    - `loyalty_rewards` - Récompenses disponibles
    - `loyalty_redemptions` - Utilisations des récompenses
  
  2. Sécurité
    - Enable RLS
    - Les clients peuvent voir leurs transactions de fidélité
*/

-- Table des transactions de fidélité
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  booking_id uuid REFERENCES bookings(id),
  salon_id uuid REFERENCES salons(id),
  
  transaction_type varchar(20) NOT NULL, -- 'earned', 'redeemed', 'expired', 'bonus'
  points integer NOT NULL,
  description text NOT NULL,
  
  -- Métadonnées
  metadata jsonb DEFAULT '{}',
  expires_at timestamptz,
  
  created_at timestamptz DEFAULT now()
);

-- Table des récompenses de fidélité
CREATE TABLE IF NOT EXISTS loyalty_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id), -- NULL = récompense globale
  
  name varchar(255) NOT NULL,
  description text,
  points_required integer NOT NULL,
  
  reward_type varchar(50) NOT NULL, -- 'discount_percentage', 'discount_fixed', 'free_service', 'gift'
  reward_value decimal(10,2), -- Valeur de la réduction ou du cadeau
  
  -- Conditions
  min_purchase_amount decimal(10,2),
  applicable_services jsonb DEFAULT '[]', -- IDs des services applicables
  max_uses_per_user integer,
  max_total_uses integer,
  
  -- Validité
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des utilisations de récompenses
CREATE TABLE IF NOT EXISTS loyalty_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  reward_id uuid NOT NULL REFERENCES loyalty_rewards(id),
  booking_id uuid REFERENCES bookings(id),
  
  points_used integer NOT NULL,
  discount_amount decimal(10,2),
  
  created_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_user ON loyalty_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_booking ON loyalty_transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_type ON loyalty_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_loyalty_rewards_salon ON loyalty_rewards(salon_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_rewards_active ON loyalty_rewards(is_active);
CREATE INDEX IF NOT EXISTS idx_loyalty_redemptions_user ON loyalty_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_redemptions_reward ON loyalty_redemptions(reward_id);

-- Vue pour calculer les points actuels des utilisateurs
CREATE OR REPLACE VIEW user_loyalty_points AS
SELECT 
  user_id,
  COALESCE(SUM(
    CASE 
      WHEN transaction_type = 'earned' OR transaction_type = 'bonus' THEN points
      WHEN transaction_type = 'redeemed' OR transaction_type = 'expired' THEN -points
      ELSE 0
    END
  ), 0) as current_points,
  COUNT(*) as total_transactions
FROM loyalty_transactions
WHERE expires_at IS NULL OR expires_at > now()
GROUP BY user_id;

-- Fonction pour attribuer des points après une réservation terminée
CREATE OR REPLACE FUNCTION award_loyalty_points()
RETURNS TRIGGER AS $$
DECLARE
  points_to_award integer;
BEGIN
  -- Attribuer des points seulement si la réservation est terminée
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Calculer les points (1 point par 1000 FCFA dépensés)
    points_to_award := FLOOR(NEW.total_amount / 1000);
    
    IF points_to_award > 0 THEN
      INSERT INTO loyalty_transactions (
        user_id,
        booking_id,
        salon_id,
        transaction_type,
        points,
        description
      ) VALUES (
        NEW.client_id,
        NEW.id,
        NEW.salon_id,
        'earned',
        points_to_award,
        'Points gagnés pour la réservation #' || NEW.booking_number
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour attribuer automatiquement les points
CREATE TRIGGER trigger_award_loyalty_points
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION award_loyalty_points();

-- Enable RLS
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_redemptions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can read their loyalty transactions"
  ON loyalty_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can read active rewards"
  ON loyalty_rewards
  FOR SELECT
  TO authenticated
  USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

CREATE POLICY "Users can read their redemptions"
  ON loyalty_redemptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create redemptions"
  ON loyalty_redemptions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());