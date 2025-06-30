/*
  # Table des réservations

  1. Table
    - `bookings` - Réservations de services
  
  2. Sécurité
    - Enable RLS
    - Les clients peuvent voir leurs réservations
    - Les providers peuvent voir les réservations de leurs salons
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number varchar(20) UNIQUE NOT NULL, -- Numéro de réservation unique
  
  -- Relations
  client_id uuid NOT NULL REFERENCES users(id),
  salon_id uuid NOT NULL REFERENCES salons(id),
  service_id uuid NOT NULL REFERENCES services(id),
  staff_id uuid REFERENCES staff(id),
  
  -- Informations de réservation
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration_minutes integer NOT NULL,
  end_time time GENERATED ALWAYS AS (booking_time + (duration_minutes || ' minutes')::interval) STORED,
  
  -- Statut
  status varchar(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
  
  -- Tarification
  service_price decimal(10,2) NOT NULL,
  additional_charges decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  currency varchar(3) DEFAULT 'XAF',
  
  -- Paiement
  payment_status varchar(20) DEFAULT 'pending', -- 'pending', 'partial', 'paid', 'refunded'
  payment_method varchar(50), -- 'cash', 'orange_money', 'mtn_momo', 'card'
  payment_reference varchar(100),
  
  -- Informations client
  client_name varchar(255) NOT NULL,
  client_phone varchar(20) NOT NULL,
  client_email varchar(255),
  
  -- Notes et commentaires
  client_notes text,
  staff_notes text,
  cancellation_reason text,
  
  -- Notifications
  reminder_sent_at timestamptz,
  confirmation_sent_at timestamptz,
  
  -- Métadonnées
  source varchar(50) DEFAULT 'web', -- 'web', 'mobile', 'phone', 'walk_in'
  metadata jsonb DEFAULT '{}',
  
  -- Timestamps
  confirmed_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_salon ON bookings(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_staff ON bookings(staff_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);

-- Index composé pour les créneaux
CREATE INDEX IF NOT EXISTS idx_bookings_schedule ON bookings(salon_id, booking_date, booking_time, status);

-- Fonction pour générer un numéro de réservation unique
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'NB' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer automatiquement le numéro de réservation
CREATE OR REPLACE FUNCTION set_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL THEN
    NEW.booking_number := generate_booking_number();
    -- S'assurer que le numéro est unique
    WHILE EXISTS (SELECT 1 FROM bookings WHERE booking_number = NEW.booking_number) LOOP
      NEW.booking_number := generate_booking_number();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_number
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_number();

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Clients can read their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid() AND status IN ('pending', 'confirmed'));

CREATE POLICY "Salon owners can read their salon bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );

CREATE POLICY "Salon owners can update their salon bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );