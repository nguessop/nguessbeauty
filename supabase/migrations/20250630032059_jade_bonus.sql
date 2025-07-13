/*
  # Table des images de salons

  1. Table
    - `salon_images` - Images et photos des salons
  
  2. Sécurité
    - Enable RLS
    - Les propriétaires peuvent gérer les images de leurs salons
*/

CREATE TABLE IF NOT EXISTS salon_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_type varchar(50) DEFAULT 'gallery', -- 'logo', 'cover', 'gallery', 'interior', 'exterior'
  alt_text varchar(255),
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  file_size integer, -- en bytes
  width integer,
  height integer,
  created_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_salon_images_salon ON salon_images(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_images_type ON salon_images(image_type);
CREATE INDEX IF NOT EXISTS idx_salon_images_primary ON salon_images(is_primary);

-- Enable RLS
ALTER TABLE salon_images ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read salon images"
  ON salon_images
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.status = 'active' AND s.is_verified = true
    )
  );

CREATE POLICY "Salon owners can manage their images"
  ON salon_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM salons s 
      WHERE s.id = salon_id AND s.owner_id = auth.uid()
    )
  );