import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toastService } from './toastService.ts';
import { history } from './navigation';
import {authService} from "./authService.ts";
import {useEffect} from "react";

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8054/api';

    this.api = axios.create({
      baseURL: this.baseURL,
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
          console.log("Interceptor déclenché, erreur Axios :", error); // ← ce log DOIT apparaître
          const originalRequest = error.config;
          console.log("Axios Interceptor Erreur:", error);
          console.log("error.response=", error.response);
          console.log("error.request=", error.request);
          console.log("error.message=", error.message);

          // Important : marquer explicitement _retry comme false si non défini
          if (typeof originalRequest._retry === 'undefined') {
            originalRequest._retry = false;
          }

          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("bearer teste")
            try {
              await this.refreshToken();
              const token = this.getToken();
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.api(originalRequest); // Retry original request
              }
            } catch (refreshError) {
              // Refresh échoué : logout forcé
              console.log("Token expiré et non rafraîchissable → déconnexion");
              await authService.logout();
              console.log("Token expiré et non rafraîchissable → déconnexionssss");
              toastService.error('Votre session a expiré. Veuillez vous reconnecter.');
              // Utilise l’historique pour rediriger
              history.push('/login');
            }
          }

          return Promise.reject(error);
        }
    );
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
      console.log("je suis là4")

      const { access_token } = response.data.data;
      this.setToken(access_token);

    } catch (error) {
      // Propage l’erreur vers l’interceptor
      console.log("je suis là4")
      throw new Error('Token refresh failed');
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