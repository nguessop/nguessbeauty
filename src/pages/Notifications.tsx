import React, { useState } from 'react';
import { Bell, MessageCircle, Calendar, Gift, Settings, Check, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'appointment-reminder',
      title: 'Rappel de rendez-vous',
      message: 'Votre rendez-vous chez Élégance Coiffure est prévu demain à 14h00',
      date: '2025-01-14T10:00:00Z',
      read: false,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      type: 'appointment-confirmed',
      title: 'Réservation confirmée',
      message: 'Votre rendez-vous du 18 janvier chez Beauty Palace a été confirmé',
      date: '2025-01-13T15:30:00Z',
      read: false,
      icon: Check,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Offre spéciale',
      message: '20% de réduction sur tous les soins visage ce week-end !',
      date: '2025-01-12T09:00:00Z',
      read: true,
      icon: Gift,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: '4',
      type: 'review-request',
      title: 'Donnez votre avis',
      message: 'Comment s\'est passé votre rendez-vous chez Élégance Coiffure ?',
      date: '2025-01-10T18:00:00Z',
      read: true,
      icon: MessageCircle,
      color: 'text-orange-600 bg-orange-100'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'À l\'instant';
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Notifications
            </h1>
            <p className="text-secondary-600">
              {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes les notifications sont lues'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Check className="h-4 w-4" />
                <span>Tout marquer comme lu</span>
              </button>
            )}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'all', label: 'Toutes', count: notifications.length },
                { id: 'unread', label: 'Non lues', count: unreadCount },
                { id: 'read', label: 'Lues', count: notifications.length - unreadCount }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    filter === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    filter === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                      <notification.icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${
                            !notification.read ? 'text-secondary-900' : 'text-secondary-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 text-sm ${
                            !notification.read ? 'text-secondary-700' : 'text-secondary-600'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-secondary-500">
                            {formatDate(notification.date)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-primary-600 hover:bg-primary-100 rounded transition-colors"
                              title="Marquer comme lu"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {filter === 'unread' ? 'Aucune notification non lue' : 
                   filter === 'read' ? 'Aucune notification lue' : 
                   'Aucune notification'}
                </h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? 'Vous recevrez ici vos notifications de rendez-vous et promotions'
                    : 'Changez de filtre pour voir d\'autres notifications'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-secondary-900 mb-6">
            Paramètres de notification
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">Rappels de rendez-vous</h3>
                <p className="text-sm text-secondary-600">Recevoir des rappels avant vos rendez-vous</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">Notifications WhatsApp</h3>
                <p className="text-sm text-secondary-600">Recevoir les notifications via WhatsApp</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">Notifications SMS</h3>
                <p className="text-sm text-secondary-600">Recevoir les notifications par SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">Promotions et offres</h3>
                <p className="text-sm text-secondary-600">Recevoir les offres spéciales des salons</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">Demandes d'avis</h3>
                <p className="text-sm text-secondary-600">Recevoir des demandes d'évaluation après vos rendez-vous</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Sauvegarder les paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;