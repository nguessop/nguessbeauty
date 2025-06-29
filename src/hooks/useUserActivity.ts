import { useState, useEffect, useRef, useCallback } from 'react';

interface UseUserActivityOptions {
  timeout?: number; // Temps d'inactivité en millisecondes (défaut: 15 minutes)
  events?: string[]; // Événements à surveiller
}

export const useUserActivity = (options: UseUserActivityOptions = {}) => {
  const {
    timeout = 15 * 60 * 1000, // 15 minutes par défaut
    events = [
      'mousedown', 
      'mousemove', 
      'keypress', 
      'scroll', 
      'touchstart', 
      'click',
      'keydown',
      'wheel',
      'resize',
      'focus'
    ]
  } = options;

  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastEventTimeRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    const now = Date.now();
    
    // Éviter les mises à jour trop fréquentes (max une par seconde)
    if (now - lastEventTimeRef.current < 1000) {
      return;
    }
    
    lastEventTimeRef.current = now;
    setLastActivity(now);
    setIsActive(true);

    // Nettoyer le timer précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Démarrer un nouveau timer
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, timeout);
  }, [timeout]);

  const handleActivity = useCallback((event: Event) => {
    // Ignorer certains événements automatiques
    if (event.type === 'mousemove') {
      const mouseEvent = event as MouseEvent;
      // Ignorer les mouvements de souris très petits (possibles mouvements automatiques)
      if (Math.abs(mouseEvent.movementX) < 2 && Math.abs(mouseEvent.movementY) < 2) {
        return;
      }
    }
    
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // Initialiser le timer
    resetTimer();

    // Ajouter les event listeners avec options pour améliorer les performances
    const options = { passive: true, capture: false };
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, options);
    });

    // Ajouter un listener pour la visibilité de la page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resetTimer();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Nettoyer les event listeners
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [events, handleActivity, resetTimer]);

  // Fonction pour forcer la réinitialisation (utile pour les actions importantes)
  const forceActive = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  return {
    isActive,
    lastActivity,
    resetTimer: forceActive,
    timeSinceLastActivity: Date.now() - lastActivity
  };
};