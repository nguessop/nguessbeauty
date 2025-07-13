import React, { useState } from 'react';
import { Settings, Globe, CreditCard, Bell, Shield, Database, Zap, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../Layout/AdminLayout';

const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'NGUESSBEAUTY',
      siteDescription: 'Plateforme de réservation pour salons de beauté au Cameroun',
      defaultLanguage: 'fr',
      defaultCurrency: 'XAF',
      timezone: 'Africa/Douala',
      maintenanceMode: false
    },
    booking: {
      minBookingTime: 30,
      maxBookingDays: 30,
      cancellationDeadline: 2,
      autoConfirmation: true,
      reminderTime: 24
    },
    payment: {
      commissionRate: 10,
      orangeMoneyEnabled: true,
      mtnMomoEnabled: true,
      cardPaymentEnabled: false,
      cashPaymentEnabled: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      whatsappNotifications: true,
      pushNotifications: true
    }
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'booking', label: 'Réservations', icon: Globe },
    { id: 'payment', label: 'Paiements', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'api', label: 'API', icon: Database },
    { id: 'maintenance', label: 'Maintenance', icon: Zap }
  ];

  const handleSave = () => {
    // Simulate save
    console.log('Settings saved:', settings);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres de la Plateforme</h1>
            <p className="text-gray-600">Configurez les paramètres généraux et spécifiques</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Paramètres Généraux</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue par défaut
                    </label>
                    <select
                      value={settings.general.defaultLanguage}
                      onChange={(e) => updateSetting('general', 'defaultLanguage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Devise par défaut
                    </label>
                    <select
                      value={settings.general.defaultCurrency}
                      onChange={(e) => updateSetting('general', 'defaultCurrency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="XAF">FCFA (XAF)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="USD">Dollar (USD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Africa/Douala">Afrique/Douala</option>
                      <option value="Europe/Paris">Europe/Paris</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du site
                  </label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">Mode maintenance</label>
                </div>
              </motion.div>
            )}

            {/* Booking Settings */}
            {activeTab === 'booking' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Paramètres de Réservation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temps minimum de réservation (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.booking.minBookingTime}
                      onChange={(e) => updateSetting('booking', 'minBookingTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Réservation maximum (jours à l'avance)
                    </label>
                    <input
                      type="number"
                      value={settings.booking.maxBookingDays}
                      onChange={(e) => updateSetting('booking', 'maxBookingDays', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai d'annulation (heures)
                    </label>
                    <input
                      type="number"
                      value={settings.booking.cancellationDeadline}
                      onChange={(e) => updateSetting('booking', 'cancellationDeadline', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rappel automatique (heures avant)
                    </label>
                    <input
                      type="number"
                      value={settings.booking.reminderTime}
                      onChange={(e) => updateSetting('booking', 'reminderTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.booking.autoConfirmation}
                    onChange={(e) => updateSetting('booking', 'autoConfirmation', e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">Confirmation automatique des réservations</label>
                </div>
              </motion.div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Paramètres de Paiement</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux de commission (%)
                  </label>
                  <input
                    type="number"
                    value={settings.payment.commissionRate}
                    onChange={(e) => updateSetting('payment', 'commissionRate', parseInt(e.target.value))}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Méthodes de paiement activées</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.payment.orangeMoneyEnabled}
                        onChange={(e) => updateSetting('payment', 'orangeMoneyEnabled', e.target.checked)}
                        className="mr-3"
                      />
                      <label className="text-sm text-gray-700">Orange Money</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.payment.mtnMomoEnabled}
                        onChange={(e) => updateSetting('payment', 'mtnMomoEnabled', e.target.checked)}
                        className="mr-3"
                      />
                      <label className="text-sm text-gray-700">MTN Mobile Money</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.payment.cardPaymentEnabled}
                        onChange={(e) => updateSetting('payment', 'cardPaymentEnabled', e.target.checked)}
                        className="mr-3"
                      />
                      <label className="text-sm text-gray-700">Carte bancaire</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.payment.cashPaymentEnabled}
                        onChange={(e) => updateSetting('payment', 'cashPaymentEnabled', e.target.checked)}
                        className="mr-3"
                      />
                      <label className="text-sm text-gray-700">Paiement en espèces</label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Paramètres de Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notifications Email</h4>
                      <p className="text-sm text-gray-600">Envoyer des notifications par email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                      className="toggle"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notifications SMS</h4>
                      <p className="text-sm text-gray-600">Envoyer des notifications par SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                      className="toggle"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notifications WhatsApp</h4>
                      <p className="text-sm text-gray-600">Envoyer des notifications via WhatsApp</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.whatsappNotifications}
                      onChange={(e) => updateSetting('notifications', 'whatsappNotifications', e.target.checked)}
                      className="toggle"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notifications Push</h4>
                      <p className="text-sm text-gray-600">Envoyer des notifications push (app mobile)</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                      className="toggle"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs content would go here */}
            {activeTab === 'security' && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres de Sécurité</h3>
                <p className="text-gray-600">Configuration de la sécurité et des permissions</p>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="text-center py-12">
                <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuration API</h3>
                <p className="text-gray-600">Gestion des clés API et intégrations externes</p>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mode Maintenance</h3>
                <p className="text-gray-600">Outils de maintenance et de diagnostic</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement;