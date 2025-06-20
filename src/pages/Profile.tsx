import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Heart, Calendar, Gift, Settings, Edit, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Aminata Diallo',
    phone: '+237 6 XX XX XX XX',
    email: 'aminata.diallo@email.com',
    city: 'Douala',
    district: 'Akwa',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
    loyaltyPoints: 150,
    totalBookings: 12,
    favoriteServices: ['Coiffure', 'Maquillage'],
    memberSince: '2024-06-15'
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <div className="flex items-center space-x-4 text-primary-100">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userData.district}, {userData.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Membre depuis {formatDate(userData.memberSince)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{userData.totalBookings}</div>
                <div className="text-sm text-gray-600">Rendez-vous</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">{userData.loyaltyPoints}</div>
                <div className="text-sm text-gray-600">Points fidélité</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">{userData.favoriteServices.length}</div>
                <div className="text-sm text-gray-600">Services favoris</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'profile', label: 'Profil', icon: User },
                { id: 'loyalty', label: 'Fidélité', icon: Gift },
                { id: 'favorites', label: 'Favoris', icon: Heart },
                { id: 'settings', label: 'Paramètres', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
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
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-secondary-900">
                  Informations personnelles
                </h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-secondary-900">{userData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-secondary-900">{userData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-secondary-900">{userData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  {isEditing ? (
                    <select
                      value={userData.city}
                      onChange={(e) => setUserData({...userData, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Douala">Douala</option>
                      <option value="Yaoundé">Yaoundé</option>
                      <option value="Bafoussam">Bafoussam</option>
                      <option value="Bamenda">Bamenda</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-secondary-900">{userData.city}</span>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Loyalty Tab */}
          {activeTab === 'loyalty' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-secondary-900">
                Programme de fidélité
              </h2>

              {/* Points Card */}
              <div className="bg-gradient-to-r from-accent-500 to-primary-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Vos points fidélité</h3>
                    <p className="text-accent-100">Cumulez des points à chaque visite</p>
                  </div>
                  <Gift className="h-12 w-12 text-accent-200" />
                </div>
                <div className="text-4xl font-bold mb-2">{userData.loyaltyPoints} points</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${(userData.loyaltyPoints % 200) / 2}%` }}
                  ></div>
                </div>
                <p className="text-sm text-accent-100 mt-2">
                  {200 - (userData.loyaltyPoints % 200)} points pour atteindre le niveau suivant
                </p>
              </div>

              {/* Rewards */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Récompenses disponibles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { points: 100, reward: '10% de réduction', description: 'Sur votre prochain rendez-vous' },
                    { points: 200, reward: 'Service gratuit', description: 'Manucure ou pédicure offerte' },
                    { points: 300, reward: '20% de réduction', description: 'Sur tous les services' },
                    { points: 500, reward: '1 soin complet gratuit', description: 'Au choix dans nos salons partenaires' }
                  ].map((reward, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg ${
                        userData.loyaltyPoints >= reward.points
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-secondary-900">{reward.reward}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          userData.loyaltyPoints >= reward.points
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {reward.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">{reward.description}</p>
                      <button
                        disabled={userData.loyaltyPoints < reward.points}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                          userData.loyaltyPoints >= reward.points
                            ? 'bg-primary-600 hover:bg-primary-700 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userData.loyaltyPoints >= reward.points ? 'Utiliser' : 'Indisponible'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-secondary-900">
                Mes favoris
              </h2>

              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun favori pour le moment
                </h3>
                <p className="text-gray-600 mb-4">
                  Ajoutez vos salons et services préférés à vos favoris
                </p>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Découvrir les salons
                </button>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-secondary-900">
                Paramètres du compte
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Confidentialité
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-secondary-900">Profil public</h4>
                        <p className="text-sm text-secondary-600">Permettre aux salons de voir votre profil</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Sécurité
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Changer le mot de passe
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Authentification à deux facteurs
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Données
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Exporter mes données
                    </button>
                    <button className="w-full text-left p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      Supprimer mon compte
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;