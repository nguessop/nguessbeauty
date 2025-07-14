import React, {useEffect, useState} from 'react';
import { Search, MapPin, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cities, services as mockServices } from '../../data/mockData';
import ServiceSelect from "../ServiceSelect.tsx";
import {serviceService} from "../../services/serviceService.ts";
import { useNavigate } from 'react-router-dom';


const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  // Charger les services au montage du composant
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices();
        setServices(response.map(s => ({ id: s.id.toString(), name: s.name })));
      } catch (error) {
        console.warn('Backend non disponible, utilisation des données mock');
        // Fallback vers les données mock
        setServices(mockServices.map(s => ({ id: s.id.toString(), name: s.name })));
      }
    };

    fetchServices();
  }, []);

  const handleSearch = () => {
    // Construire l'URL avec les paramètres de recherche
    const searchParams = new URLSearchParams();

    if (selectedCity) searchParams.append('city', selectedCity);
    if (selectedService) {
      // const serviceName = services.find(s => s.id === selectedService)?.name || '';
      searchParams.append('service_name', selectedService);
    }
    if (searchQuery) searchParams.append('query', searchQuery);

    // Rediriger vers la page de résultats
    navigate(`/services_results?${searchParams.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight"
              >
                Votre beauté,
                <span className="text-primary-600"> notre passion</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-secondary-600 leading-relaxed"
              >
                Découvrez et réservez facilement dans les meilleurs salons de beauté du Cameroun. 
                Plus de 500 professionnels vous attendent.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex space-x-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-secondary-600">Professionnels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-secondary-600">Salons partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10k+</div>
                <div className="text-sm text-secondary-600">Clients satisfaits</div>
              </div>
            </motion.div>

            {/* Search Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Trouvez votre salon idéal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <ServiceSelect
                    services={services}
                    selectedService={selectedService}
                    onServiceChange={setSelectedService}
                />

                {/* Location */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Choisir une ville</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Rechercher</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm text-secondary-600">Populaire:</span>
                <button className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition-colors">
                  Coiffure
                </button>
                <button className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition-colors">
                  Maquillage
                </button>
                <button className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition-colors">
                  Manucure
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
                alt="Salon de beauté moderne"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-900">Réservation facile</div>
                    <div className="text-sm text-secondary-600">En quelques clics</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-secondary-900">4.8/5</span>
                </div>
                <div className="text-xs text-secondary-600 mt-1">+2000 avis clients</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;