/*
  # Table des utilisateurs

  1. Table principale
    - `users` - Utilisateurs de la plateforme (clients, providers, admins)
  
  2. Sécurité
    - Enable RLS sur `users`
    - Politique pour que les utilisateurs puissent lire/modifier leurs propres données
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  phone varchar(20) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar_url text,
  email_verified_at timestamptz,
  phone_verified_at timestamptz,
  is_active boolean DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politique RLS : les utilisateurs peuvent voir et modifier leurs propres données
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);