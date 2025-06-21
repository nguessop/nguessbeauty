import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Heart, Share2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockSalons } from '../data/mockData';
import SalonWhatsAppButton from '../components/Chat/SalonWhatsAppButton';

const SalonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('services');

  const salon = mockSalons.find(s => s.id === id);

  if (!salon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Salon non trouvé</h2>
          <Link to="/salons" className="text-primary-600 hover:text-primary-700">
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % salon.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + salon.images.length) % salon.images.length);
  };

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    };
    return days[day];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={salon.images[currentImageIndex]}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        
        {salon.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {salon.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-secondary-900 mb-2">{salon.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-secondary-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-lg">{salon.rating}</span>
                      <span>({salon.reviewCount} avis)</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/booking/${salon.id}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Réserver</span>
                </Link>
              </div>

              <div className="flex items-center space-x-2 text-secondary-600 mb-4">
                <MapPin className="h-5 w-5" />
                <span>{salon.address}, {salon.district}, {salon.city}</span>
              </div>

              <p className="text-secondary-700 leading-relaxed">{salon.description}</p>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Équipements</h3>
                <div className="flex flex-wrap gap-2">
                  {salon.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'services', label: 'Services' },
                    { id: 'staff', label: 'Équipe' },
                    { id: 'reviews', label: 'Avis' },
                    { id: 'hours', label: 'Horaires' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-6 py-4 font-medium transition-colors ${
                        selectedTab === tab.id
                          ? 'text-primary-600 border-b-2 border-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Services Tab */}
                {selectedTab === 'services' && (
                  <div className="space-y-4">
                    {salon.services.map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-secondary-900">{service.name}</h4>
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                        <p className="text-secondary-600 text-sm mb-2">{service.description}</p>
                        <div className="flex justify-between items-center text-sm text-secondary-500">
                          <span>Durée: {service.duration} min</span>
                          <Link
                            to={`/booking/${salon.id}?service=${service.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Réserver ce service
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Staff Tab */}
                {selectedTab === 'staff' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salon.staff.map((member) => (
                      <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-secondary-900">{member.name}</h4>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{member.rating}</span>
                            </div>
                            <p className="text-sm text-secondary-600">{member.experience} ans d'expérience</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-accent-50 text-accent-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {selectedTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Avis clients bientôt disponibles
                      </h3>
                      <p className="text-gray-600">
                        Les avis et commentaires seront affichés ici
                      </p>
                    </div>
                  </div>
                )}

                {/* Hours Tab */}
                {selectedTab === 'hours' && (
                  <div className="space-y-3">
                    {Object.entries(salon.openingHours).map(([day, schedule]) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-secondary-900">
                          {getDayName(day)}
                        </span>
                        <span className="text-secondary-600">
                          {schedule.isOpen 
                            ? `${schedule.openTime} - ${schedule.closeTime}`
                            : 'Fermé'
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-secondary-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <span className="text-secondary-700">{salon.phone}</span>
                </div>
                {salon.whatsapp && (
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    <span className="text-secondary-700">{salon.whatsapp}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span className="text-secondary-700">Ouvert aujourd'hui: 08:00 - 18:00</span>
                </div>
              </div>

              {/* WhatsApp Contact Button */}
              <div className="mt-4">
                <SalonWhatsAppButton
                  salonName={salon.name}
                  whatsappNumber={salon.whatsapp || salon.phone}
                  phoneNumber={salon.phone}
                  variant="full"
                  message={`Bonjour ${salon.name}, j'aimerais prendre rendez-vous. Pouvez-vous me donner vos disponibilités ?`}
                />
              </div>
            </div>

            {/* Quick Booking */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="font-semibold text-secondary-900 mb-4">Réservation rapide</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Réservez votre rendez-vous en quelques clics
              </p>
              <Link
                to={`/booking/${salon.id}`}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
              >
                Choisir un créneau
              </Link>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-secondary-900 mb-4">Localisation</h3>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Carte interactive</p>
                  <p className="text-xs text-gray-500">bientôt disponible</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600 mt-3">
                {salon.address}, {salon.district}, {salon.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;