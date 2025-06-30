/*
  # Tables de géolocalisation

  1. Tables
    - `countries` - Pays
    - `regions` - Régions/États
    - `cities` - Villes
    - `districts` - Quartiers/Arrondissements
  
  2. Sécurité
    - Enable RLS sur toutes les tables
    - Lecture publique pour la géolocalisation
*/

-- Table des pays
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  code varchar(3) UNIQUE NOT NULL, -- CMR pour Cameroun
  phone_prefix varchar(10),
  currency_code varchar(3) DEFAULT 'XAF',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table des régions
CREATE TABLE IF NOT EXISTS regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES countries(id),
  name varchar(100) NOT NULL,
  code varchar(10),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table des villes
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id uuid NOT NULL REFERENCES regions(id),
  name varchar(100) NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table des quartiers
CREATE TABLE IF NOT EXISTS districts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid NOT NULL REFERENCES cities(id),
  name varchar(100) NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Index géospatiaux
CREATE INDEX IF NOT EXISTS idx_cities_location ON cities(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_districts_location ON districts(latitude, longitude);

-- Données par défaut pour le Cameroun
INSERT INTO countries (name, code, phone_prefix, currency_code) VALUES
('Cameroun', 'CMR', '+237', 'XAF');

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;

-- Politiques RLS - Lecture publique
CREATE POLICY "Anyone can read countries"
  ON countries FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Anyone can read regions"
  ON regions FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Anyone can read cities"
  ON cities FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Anyone can read districts"
  ON districts FOR SELECT TO authenticated USING (is_active = true);