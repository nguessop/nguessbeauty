import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notificationService } from '../services/notificationService';
import { toastService } from '../services/toastService';
import { useTranslation } from 'react-i18next';

export const useInstantNotifications = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Notification de bienvenue à la connexion
    const showWelcomeNotification = () => {
      const hour = new Date().getHours();
      let greeting = 'Bonjour';
      
      if (hour >= 12 && hour < 17) {
        greeting = 'Bon après-midi';
      } else if (hour >= 17) {
        greeting = 'Bonsoir';
      }

      toastService.success(`${greeting} ${user.name} ! Bienvenue sur NGUESSBEAUTY 👋`, {
        autoClose: 3000
      });
    };

    // Vérifier les nouvelles notifications
    const checkNewNotifications = async () => {
      try {
        const notifications = await notificationService.getUserNotifications(user.id);
        const unreadNotifications = notifications.filter(n => n.status !== 'delivered');

        if (unreadNotifications.length > 0) {
          const latestNotification = unreadNotifications[0];
          toastService.info(
            `${latestNotification.title}: ${latestNotification.message}`,
            {
              autoClose: 5000,
              onClick: () => {
                // Marquer comme lu et rediriger vers notifications
                notificationService.markAsRead(latestNotification.id);
                window.location.href = '/notifications';
              }
            }
          );
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };

    // Afficher notification de bienvenue après un délai
    const welcomeTimer = setTimeout(showWelcomeNotification, 1000);
    
    // Vérifier les notifications après 2 secondes
    const notificationTimer = setTimeout(checkNewNotifications, 2000);

    // Polling pour nouvelles notifications toutes les 30 secondes
    const pollInterval = setInterval(checkNewNotifications, 30000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(notificationTimer);
      clearInterval(pollInterval);
    };
  }, [isAuthenticated, user, t]);
};