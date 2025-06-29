import { useState, useEffect, useRef } from 'react';

interface UseUserActivityOptions {
  timeout?: number; // Temps d'inactivité en millisecondes (défaut: 15 minutes)
  events?: string[]; // Événements à surveiller
}

export const useUserActivity = (options: UseUserActivityOptions = {}) => {
  const {
    timeout = 15 * 60 * 1000, // 15 minutes par défaut
    events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  } = options;

  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    const now = Date.now();
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
  };

  const handleActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    // Initialiser le timer
    resetTimer();

    // Ajouter les event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Nettoyer les event listeners
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout]);

  return {
    isActive,
    lastActivity,
    resetTimer
  };
};