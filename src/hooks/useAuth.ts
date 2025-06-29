import { useState, useEffect } from 'react';
import { setupAxiosInterceptors, startTokenExpirationCheck } from '../utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleTokenExpired = () => {
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  useEffect(() => {
    // Configuration des intercepteurs Axios
    setupAxiosInterceptors(handleTokenExpired);

    // Démarrage de la vérification périodique du token
    const intervalId = startTokenExpirationCheck(handleTokenExpired);

    // Vérification initiale de l'authentification
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    // Simulation d'un délai de chargement pour afficher le loading screen
    setTimeout(checkAuth, 2000);

    // Nettoyage
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};