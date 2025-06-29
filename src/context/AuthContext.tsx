import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/authService';
import LoadingScreen from '../components/LoadingScreen';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (login: string, password: string, role?: 'client' | 'provider' | 'admin' | 'user_simple') => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Afficher le loading pendant au moins 2 secondes
        const startTime = Date.now();
        
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }

        // S'assurer que le loading dure au moins 2 secondes
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        await authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (login: string, password: string, role?: 'client' | 'provider' | 'admin' | 'user_simple') => {
    try {
      const response = await authService.login({ login, password, role });
      const { user, roles, token } = response.data;

      const userInfo = {
        ...user,
        roles,
        activeRole: role,
      };
      
      setUser(userInfo);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Nettoyer immédiatement l'état local
      setUser(null);
      
      // Nettoyer le localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // Appeler le service de déconnexion (peut échouer si le serveur est inaccessible)
      try {
        await authService.logout();
      } catch (error) {
        console.warn('Erreur lors de la déconnexion côté serveur:', error);
        // Continuer même si la déconnexion serveur échoue
      }
      
      // Redirection forcée vers la page de login
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error during logout:', error);
      // En cas d'erreur, forcer quand même la déconnexion locale et la redirection
      setUser(null);
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  // Afficher le loading screen pendant l'initialisation
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};