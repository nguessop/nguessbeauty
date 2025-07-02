import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserActivity } from './useUserActivity';
import { toastService } from '../services/toastService';

interface UseTokenExpirationOptions {
  checkInterval?: number; // Intervalle de vérification en millisecondes
  inactivityTimeout?: number; // Temps d'inactivité avant déconnexion automatique
  warningTime?: number; // Temps avant expiration pour afficher un avertissement
}

export const useTokenExpiration = (options: UseTokenExpirationOptions = {}) => {
  const {
    checkInterval = 30000, // 30 secondes (plus fréquent)
    inactivityTimeout = 15 * 60 * 1000, // 15 minutes
    warningTime = 5 * 60 * 1000 // 5 minutes avant expiration
  } = options;

  const { logout, isAuthenticated } = useAuth();
  const { isActive, lastActivity } = useUserActivity({ timeout: inactivityTimeout });
  const intervalRef = useRef<NodeJS.Timeout>();
  const warningShownRef = useRef(false);
  const lastCheckRef = useRef<number>(Date.now());

  const getTokenExpiration = (): number | null => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convertir en millisecondes
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  };

  const isTokenExpired = (): boolean => {
    const expiration = getTokenExpiration();
    if (!expiration) return true;
    return Date.now() >= expiration;
  };

  const getTimeUntilExpiration = (): number => {
    const expiration = getTokenExpiration();
    if (!expiration) return 0;
    return Math.max(0, expiration - Date.now());
  };

  const forceLogoutAndRedirect = async (reason: string) => {
    console.log(`Déconnexion forcée: ${reason}`);

    try {
      // Nettoyer immédiatement les données locales
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      // Afficher le message
      toastService.warning(reason);

      // Attendre un peu pour que l'utilisateur voie le message
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Déconnexion via le contexte
      await logout();

    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // En cas d'erreur, forcer la redirection
      window.location.href = '/login';
    }
  };

  const handleTokenExpiration = async () => {
    if (!isAuthenticated) return;

    const now = Date.now();
    const tokenExpired = isTokenExpired();
    const timeUntilExpiration = getTimeUntilExpiration();
    const timeSinceLastActivity = now - lastActivity;

    // Cas 1: Token expiré ET utilisateur inactif depuis plus de 5 minutes
    if (tokenExpired && timeSinceLastActivity > 5 * 60 * 1000) {
      await forceLogoutAndRedirect(
          'Votre session a expiré en raison d\'une inactivité prolongée. Redirection vers la connexion...'
      );
      return;
    }

    // Cas 2: Token expiré ET utilisateur actif récemment (moins de 5 minutes)
    if (tokenExpired && timeSinceLastActivity <= 5 * 60 * 1000) {
      await forceLogoutAndRedirect(
          'Votre session a expiré. Veuillez vous reconnecter...'
      );
      return;
    }

    // Cas 3: Utilisateur inactif depuis longtemps (plus de 20 minutes) même si token valide
    if (timeSinceLastActivity > 20 * 60 * 1000) {
      await forceLogoutAndRedirect(
          'Déconnexion automatique pour inactivité prolongée...'
      );
      return;
    }

    // Cas 4: Avertissement si le token expire bientôt ET utilisateur actif
    if (isActive && timeUntilExpiration <= warningTime && timeUntilExpiration > 0 && !warningShownRef.current) {
      const minutesLeft = Math.ceil(timeUntilExpiration / (60 * 1000));
      toastService.warning(
          `Votre session expire dans ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}. Restez actif pour maintenir votre connexion.`,
          { autoClose: 10000 }
      );
      warningShownRef.current = true;
    }

    // Réinitialiser le flag d'avertissement si on s'éloigne de la zone critique
    if (timeUntilExpiration > warningTime) {
      warningShownRef.current = false;
    }

    lastCheckRef.current = now;
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Vérifier immédiatement
    handleTokenExpiration();

    // Démarrer la vérification périodique
    intervalRef.current = setInterval(handleTokenExpiration, checkInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, isActive, lastActivity, checkInterval]);

  return {
    isTokenExpired: isTokenExpired(),
    timeUntilExpiration: getTimeUntilExpiration(),
    isUserActive: isActive,
    lastActivity,
    timeSinceLastActivity: Date.now() - lastActivity
  };
};