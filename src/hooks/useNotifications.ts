import { useState, useEffect } from 'react';
import { notificationService, NotificationData } from '../services/notificationService';

export const useNotifications = (userId: string, userType: 'client' | 'provider') => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadNotifications();
      
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(loadNotifications, 30000);
      
      return () => clearInterval(interval);
    }
  }, [userId]);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getUserNotifications(userId);
      setNotifications(data);
      setUnreadCount(data.filter(notif => notif.status !== 'delivered').length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, status: 'delivered' }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const sendAppointmentReminder = async (appointmentId: string, reminderType: '24h' | '2h' | '30min') => {
    try {
      await notificationService.sendAppointmentReminder(appointmentId, reminderType);
      await loadNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error sending appointment reminder:', error);
    }
  };

  const notifyProviderNewAppointment = async (appointmentId: string) => {
    try {
      await notificationService.notifyProviderNewAppointment(appointmentId);
      await loadNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error notifying provider:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    loadNotifications,
    markAsRead,
    sendAppointmentReminder,
    notifyProviderNewAppointment
  };
};