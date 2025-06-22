import React, { useState } from 'react';
import { Send, MessageCircle, Mail, Users, Calendar, Gift, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  title: string;
  type: 'promotion' | 'reminder' | 'loyalty' | 'announcement';
  message: string;
  targetAudience: 'all' | 'new' | 'loyal' | 'inactive';
  channels: ('sms' | 'whatsapp' | 'email')[];
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  sentCount: number;
  deliveredCount: number;
  createdAt: string;
}

const ProviderCommunications: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Promotion Week-end',
      type: 'promotion',
      message: '🎉 Offre spéciale week-end ! 20% de réduction sur tous les soins visage. Réservez maintenant !',
      targetAudience: 'all',
      channels: ['sms', 'whatsapp'],
      status: 'sent',
      sentCount: 156,
      deliveredCount: 142,
      createdAt: '2025-01-10'
    },
    {
      id: '2',
      title: 'Rappel RDV demain',
      type: 'reminder',
      message: 'Bonjour ! Nous vous rappelons votre rendez-vous demain à {time} chez {salon}. À bientôt !',
      targetAudience: 'all',
      channels: ['sms', 'whatsapp'],
      status: 'scheduled',
      sentCount: 0,
      deliveredCount: 0,
      scheduledFor: '2025-01-16T08:00:00',
      createdAt: '2025-01-15'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('campaigns');
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    type: 'promotion' as Campaign['type'],
    message: '',
    targetAudience: 'all' as Campaign['targetAudience'],
    channels: ['sms'] as Campaign['channels'],
    scheduledFor: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Envoyé';
      case 'scheduled': return 'Programmé';
      case 'draft': return 'Brouillon';
      case 'failed': return 'Échec';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'promotion': return Gift;
      case 'reminder': return Calendar;
      case 'loyalty': return Users;
      case 'announcement': return MessageCircle;
      default: return MessageCircle;
    }
  };

  const handleChannelToggle = (channel: 'sms' | 'whatsapp' | 'email') => {
    setNewCampaign({
      ...newCampaign,
      channels: newCampaign.channels.includes(channel)
        ? newCampaign.channels.filter(c => c !== channel)
        : [...newCampaign.channels, channel]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaign: Campaign = {
      id: Date.now().toString(),
      ...newCampaign,
      status: newCampaign.scheduledFor ? 'scheduled' : 'draft',
      sentCount: 0,
      deliveredCount: 0,
      createdAt: new Date().toISOString()
    };

    setCampaigns([campaign, ...campaigns]);
    setShowModal(false);
    setNewCampaign({
      title: '',
      type: 'promotion',
      message: '',
      targetAudience: 'all',
      channels: ['sms'],
      scheduledFor: ''
    });
  };

  const quickTemplates = [
    {
      type: 'promotion',
      title: 'Promotion Flash',
      message: '🔥 Offre limitée ! {discount}% de réduction sur {service}. Valable jusqu\'au {date}. Réservez vite !'
    },
    {
      type: 'reminder',
      title: 'Rappel 24h',
      message: 'Bonjour {client} ! Rappel de votre RDV demain à {time} pour {service}. Hâte de vous voir !'
    },
    {
      type: 'loyalty',
      title: 'Points fidélité',
      message: '🎁 Félicitations ! Vous avez {points} points. Échangez-les contre une réduction sur votre prochain RDV !'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Communication client</h1>
            <p className="text-secondary-600">Gérez vos campagnes SMS, WhatsApp et email</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle campagne</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'campaigns', label: 'Campagnes', icon: Send },
                { id: 'templates', label: 'Modèles', icon: MessageCircle },
                { id: 'analytics', label: 'Statistiques', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    selectedTab === tab.id
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

          <div className="p-6">
            {/* Campaigns Tab */}
            {selectedTab === 'campaigns' && (
              <div className="space-y-6">
                {campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          {React.createElement(getTypeIcon(campaign.type), { className: "h-5 w-5 text-primary-600" })}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">{campaign.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-secondary-600">
                            <span>Audience: {campaign.targetAudience === 'all' ? 'Tous' : campaign.targetAudience}</span>
                            <span>•</span>
                            <span>Canaux: {campaign.channels.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-secondary-700">{campaign.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-secondary-600">
                        {campaign.status === 'sent' && (
                          <>
                            <span>Envoyé: {campaign.sentCount}</span>
                            <span>Délivré: {campaign.deliveredCount}</span>
                            <span>Taux: {((campaign.deliveredCount / campaign.sentCount) * 100).toFixed(1)}%</span>
                          </>
                        )}
                        {campaign.scheduledFor && (
                          <span>Programmé: {new Date(campaign.scheduledFor).toLocaleString('fr-FR')}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Templates Tab */}
            {selectedTab === 'templates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickTemplates.map((template, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {React.createElement(getTypeIcon(template.type), { className: "h-5 w-5 text-primary-600" })}
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-900">{template.title}</h3>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-secondary-700">{template.message}</p>
                    </div>

                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Utiliser ce modèle
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Analytics Tab */}
            {selectedTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-blue-700">Messages envoyés</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">92.5%</div>
                      <div className="text-sm text-green-700">Taux de livraison</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">456</div>
                      <div className="text-sm text-purple-700">Clients actifs</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">15.3%</div>
                      <div className="text-sm text-orange-700">Taux de conversion</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Nouvelle campagne</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de la campagne *
                      </label>
                      <input
                        type="text"
                        required
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ex: Promotion Week-end"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de campagne *
                      </label>
                      <select
                        required
                        value={newCampaign.type}
                        onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value as Campaign['type']})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="promotion">Promotion</option>
                        <option value="reminder">Rappel</option>
                        <option value="loyalty">Fidélité</option>
                        <option value="announcement">Annonce</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      value={newCampaign.message}
                      onChange={(e) => setNewCampaign({...newCampaign, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Rédigez votre message..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Variables disponibles: {'{client}'}, {'{salon}'}, {'{service}'}, {'{time}'}, {'{date}'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audience cible
                      </label>
                      <select
                        value={newCampaign.targetAudience}
                        onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value as Campaign['targetAudience']})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">Tous les clients</option>
                        <option value="new">Nouveaux clients</option>
                        <option value="loyal">Clients fidèles</option>
                        <option value="inactive">Clients inactifs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Programmer l'envoi (optionnel)
                      </label>
                      <input
                        type="datetime-local"
                        value={newCampaign.scheduledFor}
                        onChange={(e) => setNewCampaign({...newCampaign, scheduledFor: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Canaux de communication *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'sms', label: 'SMS', icon: MessageCircle },
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                        { id: 'email', label: 'Email', icon: Mail }
                      ].map((channel) => (
                        <label
                          key={channel.id}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={newCampaign.channels.includes(channel.id as any)}
                            onChange={() => handleChannelToggle(channel.id as any)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <channel.icon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{channel.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      Créer la campagne
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCommunications;