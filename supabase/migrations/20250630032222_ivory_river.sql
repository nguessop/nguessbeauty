/*
  # Système de notifications

  1. Tables
    - `notifications` - Notifications envoyées aux utilisateurs
    - `notification_templates` - Modèles de notifications
  
  2. Sécurité
    - Enable RLS
    - Les utilisateurs peuvent voir leurs notifications
*/

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Destinataire
  recipient_id uuid NOT NULL REFERENCES users(id),
  recipient_type varchar(20) NOT NULL, -- 'client', 'provider', 'admin'
  
  -- Contenu
  type varchar(50) NOT NULL, -- 'appointment_reminder', 'booking_confirmed', 'promotion', etc.
  title varchar(255) NOT NULL,
  message text NOT NULL,
  
  -- Données contextuelles
  booking_id uuid REFERENCES bookings(id),
  salon_id uuid REFERENCES salons(id),
  
  -- Canaux de diffusion
  channels jsonb NOT NULL DEFAULT '["app"]', -- ['app', 'sms', 'whatsapp', 'email']
  
  -- Statut
  status varchar(20) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed'
  
  -- Programmation
  scheduled_for timestamptz,
  sent_at timestamptz,
  read_at timestamptz,
  
  -- Métadonnées
  metadata jsonb DEFAULT '{}',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des modèles de notifications
CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name varchar(100) UNIQUE NOT NULL,
  type varchar(50) NOT NULL,
  
  -- Contenu du modèle
  title_template varchar(255) NOT NULL,
  message_template text NOT NULL,
  
  -- Configuration
  default_channels jsonb DEFAULT '["app"]',
  trigger_event varchar(100), -- Événement déclencheur
  trigger_delay_minutes integer DEFAULT 0,
  
  -- Variables disponibles
  available_variables jsonb DEFAULT '[]',
  
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_booking ON notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notification_templates_type ON notification_templates(type);

-- Insérer les modèles par défaut
INSERT INTO notification_templates (name, type, title_template, message_template, default_channels, trigger_event, trigger_delay_minutes) VALUES
('appointment_reminder_24h', 'appointment_reminder', 'Rappel de rendez-vous', 'Bonjour {{client_name}}, votre rendez-vous chez {{salon_name}} est prévu demain à {{booking_time}}.', '["app", "sms", "whatsapp"]', 'booking_confirmed', 1440),
('appointment_reminder_2h', 'appointment_reminder', 'Rendez-vous dans 2h', 'Bonjour {{client_name}}, votre rendez-vous chez {{salon_name}} est dans 2 heures ({{booking_time}}).', '["app", "sms"]', 'booking_confirmed', 120),
('booking_confirmed', 'booking_confirmed', 'Réservation confirmée', 'Votre réservation chez {{salon_name}} le {{booking_date}} à {{booking_time}} a été confirmée.', '["app", "sms", "whatsapp"]', 'booking_confirmed', 0),
('new_booking_provider', 'new_booking', 'Nouvelle réservation', 'Nouvelle réservation de {{client_name}} pour le {{booking_date}} à {{booking_time}}.', '["app"]', 'booking_created', 0);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can read their notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Anyone can read active templates"
  ON notification_templates
  FOR SELECT
  TO authenticated
  USING (is_active = true);