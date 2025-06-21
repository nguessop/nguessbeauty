import React from 'react';
import { Star, MapPin, Clock, Phone, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockSalons } from '../../data/mockData';
import SalonWhatsAppButton from '../Chat/SalonWhatsAppButton';

const FeaturedSalons: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const getPriceRangeText = (range: string) => {
    switch (range) {
      case 'budget': return 'Économique';
      case 'mid': return 'Modéré';
      case 'premium': return 'Premium';
      default: return '';
    }
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'mid': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Salons recommandés
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Découvrez nos salons partenaires les mieux notés et réservez votre prochain rendez-vous
          </p>
        </motion.div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSalons.map((salon, index) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={salon.images[0]}
                  alt={salon.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriceRangeColor(salon.priceRange)}`}>
                    {getPriceRangeText(salon.priceRange)}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{salon.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-secondary-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{salon.rating}</span>
                      <span>({salon.reviewCount} avis)</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-secondary-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{salon.district}, {salon.city}</span>
                </div>

                {/* Services Preview */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {salon.services.slice(0, 3).map(service => (
                      <span
                        key={service.id}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {service.name}
                      </span>
                    ))}
                    {salon.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{salon.services.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <div className="text-sm text-secondary-600">À partir de</div>
                  <div className="text-lg font-bold text-secondary-900">
                    {formatPrice(Math.min(...salon.services.map(s => s.price)))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mb-4">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Réserver
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* WhatsApp Contact */}
                <div className="mb-4">
                  <SalonWhatsAppButton
                    salonName={salon.name}
                    whatsappNumber={salon.whatsapp || salon.phone}
                    phoneNumber={salon.phone}
                    variant="full"
                    className="w-full"
                  />
                </div>

                {/* Opening Hours */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-secondary-600">
                      Ouvert aujourd'hui: 08:00 - 18:00
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Voir tous les salons
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSalons;