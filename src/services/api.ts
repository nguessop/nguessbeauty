import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toastService } from './toastService';
import { authService } from './authService';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;
  private isHandlingTokenExpiration = false;

  constructor() {
    // Configuration de l'URL de base avec fallback
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8054/api';
    
    console.log('API Base URL:', this.baseURL);

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // Timeout de 10 secondes
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Gestion spéciale des erreurs réseau
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
          console.warn('Erreur réseau détectée:', error.message);
          // Ne pas essayer de refresh le token en cas d'erreur réseau
          return Promise.reject(new Error('Backend non disponible'));
        }
        
        const originalRequest = error.config;

        // Éviter les boucles infinies
        if (this.isHandlingTokenExpiration) {
          return Promise.reject(error);
        }

        // Important : marquer explicitement _retry comme false si non défini
        if (typeof originalRequest._retry === 'undefined') {
          originalRequest._retry = false;
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.refreshToken();
            const token = this.getToken();
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest); // Retry original request
            }
          } catch (refreshError) {
            // Refresh échoué : logout forcé
            console.log("Token expiré et non rafraîchissable → déconnexion automatique");
            await this.handleTokenExpiration();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async handleTokenExpiration(): Promise<void> {
    if (this.isHandlingTokenExpiration) {
      return; // Éviter les appels multiples
    }

    this.isHandlingTokenExpiration = true;

    try {
      // Nettoyer immédiatement les données locales
      this.removeToken();
      
      // Afficher le message d'erreur
      toastService.error('Session expirée. Redirection automatique vers la connexion...');
      
      // Attendre un peu pour que l'utilisateur voie le message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Rediriger vers la page de login
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Erreur lors de la gestion de l\'expiration du token:', error);
      // En cas d'erreur, forcer la redirection
      window.location.href = '/login';
    } finally {
      this.isHandlingTokenExpiration = false;
    }
  }

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public logout(): void {
    this.removeToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  private async refreshToken(): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token to refresh');
    }

    try {
      // Envoie le token expiré dans le header Authorization
      const response = await this.api.post('/auth/refresh', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { access_token } = response.data.data;
      this.setToken(access_token);

    } catch (error) {
      // Propage l'erreur vers l'interceptor
      throw new Error('Token refresh failed');
    }
  }

  // Méthode pour vérifier si le token est expiré
  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Generic API methods
  public async get<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }

  public async upload<T>(url: string, formData: FormData): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  public setAuthToken(token: string): void {
    this.setToken(token);
  }
}

export const apiService = new ApiService();