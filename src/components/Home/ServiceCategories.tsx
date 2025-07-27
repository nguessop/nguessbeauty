import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { serviceService } from '../../services/serviceService.ts';

interface Service {
  id: number;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  icon?: string;
  popular?: boolean;
}

const ServiceCategories: React.FC = () => {
  const [services, setServices] = useState<any>([]);
  const [popularServices, setPopularServices] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices();
        console.log("service_filter", response.data)
        setServices(response.data); // Adapter selon la structure de la réponse
        setPopularServices(response.popular);
      } catch (error) {
        console.error('Erreur lors du chargement des services', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // const popularServices = services.filter((service) => service.popular);

  return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Nos services
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Explorez notre large gamme de services beauté disponibles dans nos salons partenaires
            </p>
          </motion.div>

          {/* Categories Grid */}
          {loading ? (
              <p className="text-center text-secondary-500">Chargement des services...</p>
          ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                          {service.icon || '💇‍♀️'}
                        </div>
                        <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {service.name}
                        </h3>
                      </div>
                    </motion.div>
                ))}
              </div>
          )}

          {/* Popular Services */}
          {!loading && popularServices.length > 0 && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-16"
              >
                <h3 className="text-2xl font-bold text-secondary-900 text-center mb-8">
                  Services les plus demandés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {popularServices.map((service, index) => (
                      <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                          className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        {service.popular && (
                            <div className="absolute top-4 left-4 z-10">
                      <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Populaire
                      </span>
                            </div>
                        )}
                        <div className="h-48 overflow-hidden">
                          <img
                              src={service.image || 'https://via.placeholder.com/400x300'} // Fallback si pas d’image
                              alt={service.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-secondary-900 mb-2">{service.name}</h4>
                          <p className="text-secondary-600 mb-4">{service.description || 'Description indisponible'}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-primary-600">{service.price || 'Prix sur demande'}</span>
                            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                              Réserver
                            </button>
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
          )}
        </div>
      </section>
  );
};

export default ServiceCategories;
