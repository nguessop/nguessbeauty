import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Heart, Calendar, Gift, Settings, Edit, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import WatermarkBackground from '../components/Layout/WatermarkBackground';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  usePageTitle('pages.profile.title');

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

  const tabs = [
    { id: 'profile', label: t('profile.tabs.profile'), icon: User },
    { id: 'loyalty', label: t('profile.tabs.loyalty'), icon: Gift },
    { id: 'favorites', label: t('profile.tabs.favorites'), icon: Heart },
    { id: 'settings', label: t('profile.tabs.settings'), icon: Settings }
  ];

  return (
    <WatermarkBackground watermarkText="NGUESSBEAUTY PROFILE">
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
                      <span>{t('profile.memberSince')} {formatDate(userData.memberSince)}</span>
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
                  <div className="text-sm text-gray-600">{t('profile.stats.appointments')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{userData.loyaltyPoints}</div>
                  <div className="text-sm text-gray-600">{t('profile.stats.loyaltyPoints')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{userData.favoriteServices.length}</div>
                  <div className="text-sm text-gray-600">{t('profile.stats.favoriteServices')}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => (
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
                    {t('profile.personalInfo')}
                  </h2>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? t('common.save') : t('common.edit')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.name')}
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
                      {t('auth.phone')}
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
                      {t('auth.email')}
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
                      {t('profile.city')}
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
                      {t('common.save')}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== 'profile' && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('profile.comingSoon')}
                </h3>
                <p className="text-gray-600">
                  {t('profile.featureInDevelopment')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </WatermarkBackground>
  );
};

export default Profile;