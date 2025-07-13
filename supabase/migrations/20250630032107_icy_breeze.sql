/*
  # Table des services proposés par les salons

  1. Table
    - `services` - Services spécifiques proposés par chaque salon
  
  2. Sécurité
    - Enable RLS
    - Les propriétaires peuvent gérer les services de leurs salons
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES service_categories(id),
  subcategory_id uuid REFERENCES service_subcategories(id),
  
  name varchar(255) NOT NULL,
  description text,
  
  -- Tarification
  price decimal(10,2) NOT NULL,
  price_max decimal(10,2), -- Pour les services avec fourchette de prix
  currency varchar(3) DEFAULT 'XAF',
  
  -- Durée
  duration_minutes integer NOT NULL,
  buffer_time_minutes integer DEFAULT 15, -- Temps de préparation/nettoyage
  
  -- Disponibilité
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  requires_consultation boolean DEFAULT false,
  
  -- Métadonnées
  tags jsonb DEFAULT '[]', -- ['populaire', 'nouveau', 'promo']
  requirements text, -- Exigences spéciales
  contraindications text, -- Contre-indications
  
  -- Métriques
  booking_count integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.00,
  review_count integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_services_salon ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_subcategory ON services(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_price ON services(price);

-- Index pour recherche textuelle
CREATE INDEX IF NOT EXISTS idx_services_search ON services USING gin(to_tsvector('french', name || ' ' || COALESCE(description, '')));

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read active services"
  ON services
  FOR SELECT
  TO authenticated
  USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.status = 'active' AND s.is_verified = true
    )
  );

CREATE POLICY "Salon owners can manage their services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );