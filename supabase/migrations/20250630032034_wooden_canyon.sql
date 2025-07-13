/*
  # Tables des catégories de services

  1. Tables
    - `service_categories` - Catégories principales (coiffure, maquillage, etc.)
    - `service_subcategories` - Sous-catégories pour plus de précision
  
  2. Sécurité
    - Enable RLS
    - Lecture publique pour les catégories actives
*/

-- Table des catégories de services
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  slug varchar(100) UNIQUE NOT NULL,
  description text,
  icon_name varchar(50), -- Nom de l'icône (ex: 'scissors', 'palette')
  color_hex varchar(7) DEFAULT '#6366f1', -- Couleur pour l'UI
  image_url text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des sous-catégories
CREATE TABLE IF NOT EXISTS service_subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  slug varchar(100) NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_service_subcategories_category ON service_subcategories(category_id);

-- Données par défaut
INSERT INTO service_categories (name, slug, description, icon_name, color_hex, sort_order) VALUES
('Coiffure', 'coiffure', 'Services de coiffure et soins capillaires', 'scissors', '#3B82F6', 1),
('Maquillage', 'maquillage', 'Services de maquillage professionnel', 'palette', '#EC4899', 2),
('Manucure & Pédicure', 'manucure-pedicure', 'Soins des ongles et des mains/pieds', 'hand', '#8B5CF6', 3),
('Soins du visage', 'soins-visage', 'Soins esthétiques du visage', 'sparkles', '#10B981', 4),
('Soins du corps', 'soins-corps', 'Massages et soins corporels', 'heart', '#F59E0B', 5),
('Extensions & Tresses', 'extensions-tresses', 'Extensions capillaires et tresses africaines', 'crown', '#EF4444', 6),
('Défrisage & Lissage', 'defrisage-lissage', 'Services de défrisage et lissage', 'waves', '#06B6D4', 7),
('Coloration', 'coloration', 'Coloration et décoloration capillaire', 'star', '#84CC16', 8);

-- Enable RLS
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_subcategories ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read active categories"
  ON service_categories
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can read active subcategories"
  ON service_subcategories
  FOR SELECT
  TO authenticated
  USING (is_active = true);