/*
  # Table des rôles et permissions

  1. Tables
    - `roles` - Rôles disponibles (client, provider, admin, etc.)
    - `user_roles` - Association utilisateurs-rôles (many-to-many)
  
  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques appropriées pour chaque rôle
*/

-- Table des rôles
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(50) UNIQUE NOT NULL,
  display_name varchar(100) NOT NULL,
  description text,
  permissions jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table de liaison utilisateurs-rôles
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES users(id),
  is_active boolean DEFAULT true,
  UNIQUE(user_id, role_id)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- Insérer les rôles par défaut
INSERT INTO roles (name, display_name, description, permissions) VALUES
('client', 'Client', 'Utilisateur client de la plateforme', '["book_appointments", "view_salons", "write_reviews"]'),
('provider', 'Prestataire', 'Propriétaire de salon de beauté', '["manage_salon", "manage_services", "manage_staff", "view_bookings"]'),
('admin', 'Administrateur', 'Administrateur de la plateforme', '["manage_all", "view_analytics", "manage_users", "manage_salons"]'),
('user_simple', 'Utilisateur Simple', 'Utilisateur avec accès limité', '["view_salons"]');

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Anyone can read roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can read their roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());