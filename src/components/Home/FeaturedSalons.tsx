import React, { useEffect, useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { salonService } from '../../services/salonService';
import SalonWhatsAppButton from '../Chat/SalonWhatsAppButton';

const FeaturedSalons: React.FC = () => {
  const [salons, setSalons] = useState<any[]>([]);
  const [visibleSalons, setVisibleSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // 👉 Base URL du backend Laravel
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8054';

  const formatPrice = (price: number) =>
      new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

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

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await salonService.getAllSalons();
        console.log('Les salons:', response.data);
        setSalons(response.data);
        setVisibleSalons(response.data.slice(0, 3));
      } catch (error) {
        console.error('Erreur lors du chargement des salons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleShowAll = () => {
    setVisibleSalons(salons);
    setShowAll(true);
  };

  if (loading) {
    return (
        <div className="text-center py-16">
          <p className="text-gray-500">Chargement des salons...</p>
        </div>
    );
  }

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
            {visibleSalons.map((salon, index) => {
              // ✅ Chercher l’image de type "cover"
              const coverImage = salon.pictures?.find(
                  (pic: any) => pic.picture_type === 'cover'
              )?.url;

              // 🔗 URL complète de l’image
              const imageUrl = coverImage
                  ? `${BASE_URL}${coverImage}`
                  : '/placeholder.jpg';

              return (
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
                          src={imageUrl}
                          alt={salon.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriceRangeColor(
                            salon.price_range
                        )}`}
                    >
                      {getPriceRangeText(salon.price_range)}
                    </span>
                      </div>
                      <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">
                          {salon.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-secondary-600">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{salon.rating ?? 0}</span>
                            <span>({salon.reviewCount} avis)</span>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-2 text-secondary-600 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                      {salon.district}, {salon.city}
                    </span>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {(salon.service ?? []).slice(0, 3).map((service: any) => (
                              <span
                                  key={service.id}
                                  className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                              >
                          {service.name}
                        </span>
                          ))}
                          {(salon.service ?? []).length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{(salon.service ?? []).length - 3} autres
                        </span>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="mb-4">
                        <SalonWhatsAppButton
                            salonName={salon.name}
                            whatsappNumber={salon.whatsap ?? salon.phone}
                            phoneNumber={salon.phone}
                            variant="full"
                            className="w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
              );
            })}
          </div>

          {/* Voir plus */}
          {!showAll && salons.length > 3 && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center mt-12"
              >
                <button
                    onClick={handleShowAll}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Voir tous les salons
                </button>
              </motion.div>
          )}
        </div>
      </section>
  );
};

export default FeaturedSalons;