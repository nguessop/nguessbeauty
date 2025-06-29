import { Salon, Service, Staff, Client, Appointment } from '../types';

export const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Élégance Coiffure',
    description: 'Salon de coiffure moderne spécialisé dans les coupes tendances et les soins capillaires.',
    address: 'Rue de la Réunification, Akwa',
    city: 'Douala',
    district: 'Akwa',
    phone: '+237 6 XX XX XX XX',
    whatsapp: '+237 6 XX XX XX XX',
    email: 'contact@elegance-coiffure.cm',
    rating: 4.8,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg'
    ],
    services: [
      {
        id: 's1',
        name: 'Coupe + Brushing',
        description: 'Coupe moderne avec brushing professionnel',
        duration: 90,
        price: 15000,
        category: 'coiffure',
        staffIds: ['st1', 'st2']
      },
      {
        id: 's2',
        name: 'Défrisage',
        description: 'Défrisage complet avec soins',
        duration: 180,
        price: 25000,
        category: 'defrisage',
        staffIds: ['st1']
      },
      {
        id: 's3',
        name: 'Tresses Africaines',
        description: 'Tresses traditionnelles et modernes',
        duration: 240,
        price: 20000,
        category: 'tresses',
        staffIds: ['st2']
      }
    ],
    staff: [
      {
        id: 'st1',
        name: 'Marie Ngono',
        specialties: ['Coiffure', 'Défrisage', 'Soins'],
        rating: 4.9,
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
        experience: 8
      },
      {
        id: 'st2',
        name: 'Grace Mballa',
        specialties: ['Tresses', 'Extensions', 'Coiffure'],
        rating: 4.7,
        avatar: 'https://images.pexels.com/photos/3992644/pexels-photo-3992644.jpeg',
        experience: 5
      }
    ],
    openingHours: {
      monday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '08:00', closeTime: '19:00' },
      saturday: { isOpen: true, openTime: '08:00', closeTime: '19:00' },
      sunday: { isOpen: false }
    },
    amenities: ['Climatisation', 'WiFi', 'Parking', 'Produits bio'],
    priceRange: 'mid'
  },
  {
    id: '2',
    name: 'Beauty Palace',
    description: 'Institut de beauté complet : soins visage, manucure, pédicure et maquillage.',
    address: 'Avenue Kennedy, Bastos',
    city: 'Yaoundé',
    district: 'Bastos',
    phone: '+237 6 YY YY YY YY',
    whatsapp: '+237 6 YY YY YY YY',
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg',
      'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg'
    ],
    services: [
      {
        id: 's4',
        name: 'Soin Visage Complet',
        description: 'Nettoyage, gommage, masque et hydratation',
        duration: 120,
        price: 18000,
        category: 'soins-visage',
        staffIds: ['st3']
      },
      {
        id: 's5',
        name: 'Manucure Française',
        description: 'Manucure classique avec vernis français',
        duration: 60,
        price: 8000,
        category: 'manucure',
        staffIds: ['st3', 'st4']
      },
      {
        id: 's6',
        name: 'Maquillage Soirée',
        description: 'Maquillage professionnel pour événements',
        duration: 90,
        price: 22000,
        category: 'maquillage',
        staffIds: ['st4']
      }
    ],
    staff: [
      {
        id: 'st3',
        name: 'Fatima Alhadji',
        specialties: ['Soins visage', 'Manucure', 'Pédicure'],
        rating: 4.8,
        avatar: 'https://images.pexels.com/photos/3992659/pexels-photo-3992659.jpeg',
        experience: 6
      },
      {
        id: 'st4',
        name: 'Sandrine Fouda',
        specialties: ['Maquillage', 'Soins', 'Manucure'],
        rating: 4.5,
        avatar: 'https://images.pexels.com/photos/3992660/pexels-photo-3992660.jpeg',
        experience: 4
      }
    ],
    openingHours: {
      monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      sunday: { isOpen: true, openTime: '10:00', closeTime: '16:00' }
    },
    amenities: ['Climatisation', 'WiFi', 'Thé/Café', 'Magazines'],
    priceRange: 'premium'
  }
];

export const mockClient: Client = {
  id: 'c1',
  name: 'Aminata Diallo',
  phone: '+237 6 XX XX XX XX',
  email: 'aminata.diallo@email.com',
  loyaltyPoints: 150,
  appointments: [],
  preferences: {
    favoriteServices: ['s1', 's4'],
    preferredStaff: ['st1', 'st3'],
    notifications: {
      sms: true,
      whatsapp: true,
      email: false
    }
  }
};

export const serviceCategories = [
  { id: 'coiffure', name: 'Coiffure', icon: '✂️' },
  { id: 'maquillage', name: 'Maquillage', icon: '💄' },
  { id: 'manucure', name: 'Manucure', icon: '💅' },
  { id: 'pedicure', name: 'Pédicure', icon: '🦶' },
  { id: 'soins-visage', name: 'Soins Visage', icon: '🧴' },
  { id: 'soins-corps', name: 'Soins Corps', icon: '🛁' },
  { id: 'extensions', name: 'Extensions', icon: '💇‍♀️' },
  { id: 'tresses', name: 'Tresses', icon: '🎀' },
  { id: 'defrisage', name: 'Défrisage', icon: '🔥' },
  { id: 'coloration', name: 'Coloration', icon: '🎨' }
];

export const cities = [
  'Douala',
  'Yaoundé',
  'Bafoussam',
  'Bamenda',
  'Garoua',
  'Maroua',
  'Ngaoundéré',
  'Bertoua',
  'Ebolowa',
  'Kumba'
];