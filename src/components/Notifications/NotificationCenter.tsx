import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Calendar, MessageCircle, Gift, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService, NotificationData } from '../../services/notificationService';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userType: 'client' | 'provider';
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  userId,
  userType
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, userId]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getUserNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(notifications.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: 'delivered' }
          : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment-reminder':
      case 'appointment-confirmed':
      case 'new-appointment':
        return Calendar;
      case 'promotion':
        return Gift;
      case 'review-request':
        return MessageCircle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment-reminder':
        return 'text-blue-600 bg-blue-100';
      case 'appointment-confirmed':
        return 'text-green-600 bg-green-100';
      case 'new-appointment':
        return 'text-purple-600 bg-purple-100';
      case 'promotion':
        return 'text-orange-600 bg-orange-100';
      case 'review-request':
        return 'text-pink-600 bg-pink-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (dateString: string) => {
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

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return notif.status !== 'delivered';
    return true;
  });

  const unreadCount = notifications.filter(notif => notif.status !== 'delivered').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary-900">Notifications</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Toutes ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === 'unread'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Non lues ({unreadCount})
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification, index) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const isUnread = notification.status !== 'delivered';
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        isUnread ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => isUnread && handleMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-semibold ${
                              isUnread ? 'text-secondary-900' : 'text-secondary-700'
                            }`}>
                              {notification.title}
                            </h4>
                            {isUnread && (
                              <div className="w-2 h-2 bg-primary-600 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                          
                          <p className={`mt-1 text-sm ${
                            isUnread ? 'text-secondary-700' : 'text-secondary-600'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-secondary-500">
                              {formatTime(notification.createdAt)}
                            </span>
                            
                            <div className="flex items-center space-x-1">
                              {notification.channels.map((channel, idx) => (
                                <span
                                  key={idx}
                                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {channel.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Bell className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
                </h3>
                <p className="text-gray-600">
                  {filter === 'unread' 
                    ? 'Toutes vos notifications sont à jour'
                    : 'Vous recevrez ici vos notifications importantes'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
              Voir toutes les notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;