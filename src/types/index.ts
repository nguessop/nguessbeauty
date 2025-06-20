export interface Salon {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  services: Service[];
  staff: Staff[];
  openingHours: OpeningHours;
  amenities: string[];
  priceRange: 'budget' | 'mid' | 'premium';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: ServiceCategory;
  staffIds: string[];
}

export interface Staff {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  avatar?: string;
  experience: number; // years
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface Appointment {
  id: string;
  salonId: string;
  serviceId: string;
  staffId: string;
  clientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  totalPrice: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  paymentMethod?: PaymentMethod;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  loyaltyPoints: number;
  appointments: Appointment[];
  preferences: ClientPreferences;
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

export type ServiceCategory = 
  | 'coiffure'
  | 'maquillage'
  | 'manucure'
  | 'pedicure'
  | 'soins-visage'
  | 'soins-corps'
  | 'extensions'
  | 'tresses'
  | 'defrisage'
  | 'coloration';

export type PaymentMethod = 
  | 'cash'
  | 'orange-money'
  | 'mtn-momo'
  | 'card'
  | 'bank-transfer';

export interface Review {
  id: string;
  salonId: string;
  clientId: string;
  rating: number;
  comment: string;
  date: string;
  serviceId?: string;
  staffId?: string;
}

export interface Notification {
  id: string;
  type: 'appointment-reminder' | 'appointment-confirmed' | 'promotion' | 'review-request';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}