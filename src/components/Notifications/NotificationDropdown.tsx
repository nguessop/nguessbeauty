import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Calendar, Gift, MessageCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { notificationService, NotificationData } from '../../services/notificationService';
import { toastService } from '../../services/toastService';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userType: 'client' | 'provider';
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  userId,
  userType
}) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      loadNotifications();
    }
  }, [isOpen, userId]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getUserNotifications(userId);
      setNotifications(data.slice(0, 5)); // Show only 5 recent notifications
    } catch (error) {
      toastService.error(t('messages.error.general'));
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
      toastService.success('Notification marquée comme lue');
    } catch (error) {
      toastService.error(t('messages.error.general'));
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('notifications.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">{t('common.loading')}</p>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    const isUnread = notification.status !== 'delivered';
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          isUnread ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className={`text-sm font-medium ${
                                isUnread ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h4>
                              {isUnread && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="p-1 text-blue-600 hover:text-blue-800"
                                  title="Marquer comme lu"
                                >
                                  <Check className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                            
                            <p className={`mt-1 text-sm ${
                              isUnread ? 'text-gray-700' : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>
                            
                            <p className="mt-1 text-xs text-gray-500">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {t('notifications.noNotifications')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Vous recevrez ici vos notifications importantes
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200">
                <button 
                  onClick={() => {
                    onClose();
                    // Navigate to full notifications page
                  }}
                  className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Voir toutes les notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;