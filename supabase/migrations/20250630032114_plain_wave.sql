/*
  # Table du personnel des salons

  1. Table
    - `staff` - Personnel travaillant dans les salons
  
  2. Sécurité
    - Enable RLS
    - Les propriétaires peuvent gérer le personnel de leurs salons
*/

CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id), -- Si le staff a un compte utilisateur
  
  name varchar(255) NOT NULL,
  email varchar(255),
  phone varchar(20),
  avatar_url text,
  
  -- Informations professionnelles
  position varchar(100), -- 'coiffeuse', 'estheticienne', 'maquilleuse'
  specialties jsonb DEFAULT '[]', -- Spécialités du personnel
  experience_years integer DEFAULT 0,
  certifications jsonb DEFAULT '[]',
  
  -- Disponibilité
  is_active boolean DEFAULT true,
  working_hours jsonb DEFAULT '{}', -- Horaires de travail
  
  -- Métriques
  rating decimal(3,2) DEFAULT 0.00,
  review_count integer DEFAULT 0,
  total_services integer DEFAULT 0,
  
  -- Métadonnées
  bio text,
  languages jsonb DEFAULT '["fr"]',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table de liaison services-personnel (qui peut faire quoi)
CREATE TABLE IF NOT EXISTS staff_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  is_primary boolean DEFAULT false, -- Personnel principal pour ce service
  created_at timestamptz DEFAULT now(),
  UNIQUE(staff_id, service_id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_staff_salon ON staff(salon_id);
CREATE INDEX IF NOT EXISTS idx_staff_user ON staff(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_active ON staff(is_active);
CREATE INDEX IF NOT EXISTS idx_staff_services_staff ON staff_services(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_services_service ON staff_services(service_id);

-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_services ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read active staff"
  ON staff
  FOR SELECT
  TO authenticated
  USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.status = 'active' AND s.is_verified = true
    )
  );

CREATE POLICY "Salon owners can manage their staff"
  ON staff
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read staff services"
  ON staff_services
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff st
      JOIN salons s ON st.salon_id = s.id
      WHERE st.id = staff_id AND s.status = 'active' AND s.is_verified = true
    )
  );

CREATE POLICY "Salon owners can manage staff services"
  ON staff_services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff st
      JOIN salons s ON st.salon_id = s.id
      WHERE st.id = staff_id AND s.owner_id = auth.uid()
    )
  );