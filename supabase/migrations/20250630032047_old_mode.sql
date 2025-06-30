/*
  # Table des salons (providers)

  1. Table principale
    - `salons` - Informations des salons de beauté
  
  2. Sécurité
    - Enable RLS
    - Les providers peuvent gérer leurs salons
    - Lecture publique pour les salons actifs
*/

CREATE TABLE IF NOT EXISTS salons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL,
  slug varchar(255) UNIQUE NOT NULL,
  description text,
  business_type varchar(100), -- 'salon_coiffure', 'institut_beaute', 'spa', etc.
  
  -- Adresse et localisation
  address text NOT NULL,
  city_id uuid REFERENCES cities(id),
  district_id uuid REFERENCES districts(id),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  
  -- Contact
  phone varchar(20) NOT NULL,
  whatsapp varchar(20),
  email varchar(255),
  website_url text,
  
  -- Informations business
  business_license varchar(100),
  tax_number varchar(100),
  
  -- Horaires (JSON pour flexibilité)
  opening_hours jsonb DEFAULT '{}',
  
  -- Équipements et services
  amenities jsonb DEFAULT '[]', -- ['wifi', 'parking', 'climatisation']
  payment_methods jsonb DEFAULT '[]', -- ['cash', 'orange_money', 'mtn_momo']
  
  -- Gamme de prix
  price_range varchar(20) DEFAULT 'mid', -- 'budget', 'mid', 'premium'
  
  -- Statut et validation
  status varchar(20) DEFAULT 'pending', -- 'pending', 'active', 'inactive', 'suspended'
  is_verified boolean DEFAULT false,
  verified_at timestamptz,
  verified_by uuid REFERENCES users(id),
  
  -- Métriques
  rating decimal(3,2) DEFAULT 0.00,
  review_count integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  
  -- Métadonnées
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_salons_owner ON salons(owner_id);
CREATE INDEX IF NOT EXISTS idx_salons_slug ON salons(slug);
CREATE INDEX IF NOT EXISTS idx_salons_status ON salons(status);
CREATE INDEX IF NOT EXISTS idx_salons_city ON salons(city_id);
CREATE INDEX IF NOT EXISTS idx_salons_district ON salons(district_id);
CREATE INDEX IF NOT EXISTS idx_salons_location ON salons(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_salons_rating ON salons(rating);
CREATE INDEX IF NOT EXISTS idx_salons_verified ON salons(is_verified);

-- Index pour recherche textuelle
CREATE INDEX IF NOT EXISTS idx_salons_search ON salons USING gin(to_tsvector('french', name || ' ' || COALESCE(description, '')));

-- Enable RLS
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read active salons"
  ON salons
  FOR SELECT
  TO authenticated
  USING (status = 'active' AND is_verified = true);

CREATE POLICY "Owners can manage their salons"
  ON salons
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Admins can manage all salons"
  ON salons
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name = 'admin'
    )
  );