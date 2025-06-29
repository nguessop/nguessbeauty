import { apiService } from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/auth';

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('user');
    console.log("userData", userData)
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  private clearUserFromStorage(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      console.log("myResponse",response);
      // Save token and user data
      apiService.setAuthToken(response.data.token);
      this.saveUserToStorage(response.data.user);
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', data);
      
      // Save token and user data
      apiService.setAuthToken(response.token);
      this.saveUserToStorage(response.user);
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  }

  public async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      apiService.logout();
      this.clearUserFromStorage();
    }
  }

  public async getCurrentUser(): Promise<User> {
    if (!this.currentUser) {
      console.log("teste", this.currentUser)
      const user = await apiService.get<User>('/auth/me');
      this.saveUserToStorage(user);
      return user;
    }
    const rawUser = this.currentUser;
    const rolesArray = rawUser.roles?.map((role: any) => role.libelle) || [];

    const user: User = {
      id: rawUser.id,
      name: rawUser.name,
      email: rawUser.email,
      phone: rawUser.telephone,
      avatar: rawUser.avatar ?? '',
      roles: rolesArray,
      emailVerifiedAt: rawUser.email_verified_at,
      createdAt: rawUser.created_at,
      updatedAt: rawUser.updated_at,
    };

    return user;


    // return this.currentUser;
  }

  public async updateProfile(data: Partial<User>): Promise<User> {
    const updatedUser = await apiService.put<User>('/auth/profile', data);
    this.saveUserToStorage(updatedUser);
    return updatedUser;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPassword,
    });
  }

  public async forgotPassword(email: string): Promise<void> {
    await apiService.post('/auth/forgot-password', { email });
  }

  public async resetPassword(token: string, email: string, password: string): Promise<void> {
    await apiService.post('/auth/reset-password', {
      token,
      email,
      password,
      password_confirmation: password,
    });
  }

  public async verifyEmail(token: string): Promise<void> {
    await apiService.post('/auth/verify-email', { token });
  }

  public async resendVerificationEmail(): Promise<void> {
    await apiService.post('/auth/resend-verification');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token') && !!this.currentUser;
  }

  public getUser(): User | null {
    return this.currentUser;
  }

  public getUserRole(): 'client' | 'provider' | 'admin' | 'user_simple' | null {
    return this.currentUser?.role || null;
  }

  public isClient(): boolean {
    return this.currentUser?.role === 'client';
  }

  public isProvider(): boolean {
    return this.currentUser?.role === 'provider';
  }
}

export const authService = new AuthService();