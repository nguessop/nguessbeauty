import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserActivity } from './useUserActivity';
import { toastService } from '../services/toastService';
import { useNavigate } from 'react-router-dom';

interface UseTokenExpirationOptions {
  checkInterval?: number; // Intervalle de vérification en millisecondes
  inactivityTimeout?: number; // Temps d'inactivité avant déconnexion automatique
  warningTime?: number; // Temps avant expiration pour afficher un avertissement
}

export const useTokenExpiration = (options: UseTokenExpirationOptions = {}) => {
  const {
    checkInterval = 60000, // 1 minute
    inactivityTimeout = 15 * 60 * 1000, // 15 minutes
    warningTime = 5 * 60 * 1000 // 5 minutes avant expiration
  } = options;

  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isActive } = useUserActivity({ timeout: inactivityTimeout });
  const intervalRef = useRef<NodeJS.Timeout>();
  const warningShownRef = useRef(false);

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

  const handleTokenExpiration = async () => {
    if (!isAuthenticated) return;

    // Si l'utilisateur est inactif et le token est expiré, déconnecter automatiquement
    if (!isActive && isTokenExpired()) {
      toastService.warning('Votre session a expiré en raison d\'une inactivité prolongée.');
      await logout();
      navigate('/login', { replace: true });
      return;
    }

    // Si l'utilisateur est actif mais le token est expiré, demander une reconnexion
    if (isActive && isTokenExpired()) {
      toastService.error('Votre session a expiré. Veuillez vous reconnecter.');
      await logout();
      navigate('/login', { replace: true });
      return;
    }

    // Afficher un avertissement si le token expire bientôt (seulement si l'utilisateur est actif)
    const timeUntilExpiration = getTimeUntilExpiration();
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
  }, [isAuthenticated, isActive, checkInterval]);

  return {
    isTokenExpired: isTokenExpired(),
    timeUntilExpiration: getTimeUntilExpiration(),
    isUserActive: isActive
  };
};