import axios from 'axios';
import { toast } from 'react-toastify';

// Configuration de l'intercepteur Axios pour gérer l'expiration des tokens
export const setupAxiosInterceptors = (onTokenExpired: () => void) => {
  // Intercepteur pour les requêtes
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour les réponses
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token expiré ou invalide
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        toast.error('Votre session a expiré. Veuillez vous reconnecter.');
        onTokenExpired();
      }
      return Promise.reject(error);
    }
  );
};

// Fonction pour vérifier si le token est expiré
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Fonction pour vérifier périodiquement l'expiration du token
export const startTokenExpirationCheck = (onTokenExpired: () => void) => {
  const checkInterval = setInterval(() => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.error('Votre session a expiré. Veuillez vous reconnecter.');
      onTokenExpired();
      clearInterval(checkInterval);
    }
  }, 60000); // Vérification toutes les minutes

  return checkInterval;
};

// Fonction pour déconnecter l'utilisateur
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};