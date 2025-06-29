// Rôles disponibles dans l'app
export type UserRole = 'client' | 'provider' | 'admin' | 'user_simple';
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole[];//'client' | 'provider' | 'admin' | 'user_simple'
  emailVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client extends User {
  role: 'client';
  city: string;
  district?: string;
  loyaltyPoints: number;
  totalBookings: number;
  memberSince: string;
  preferences: ClientPreferences;
}

export interface Provider extends User {
  role: 'provider';
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  district: string;
  description?: string;
  isVerified: boolean;
  documents?: ProviderDocument[];
}

export interface ProviderDocument {
  id: string;
  type: 'business_license' | 'id_card' | 'certificate';
  fileName: string;
  filePath: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

export interface ClientPreferences {
  favoriteServices: string[];
  preferredStaff: string[];
  notifications: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginCredentials {
  login: string;
  password: string;
  role?: 'client' | 'provider' | 'admin' | 'user_simple';
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  role: 'client' | 'provider';
  city: string;
  district?: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  description?: string;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  appointmentId?: string;
  createdAt: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'points';
  discountValue: number;
  minPoints?: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  applicableServices?: string[];
  image?: string;
}