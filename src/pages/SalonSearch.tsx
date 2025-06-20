import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Heart, Phone, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockSalons, serviceCategories, cities } from '../data/mockData';

const SalonSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSalons = useMemo(() => {
    let filtered = mockSalons.filter(salon => {
      const matchesSearch = searchQuery === '' || 
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === '' || salon.city === selectedCity;
      
      const matchesService = selectedService === '' || 
        salon.services.some(service => service.category === selectedService);
      
      const matchesPriceRange = priceRange === '' || salon.priceRange === priceRange;
      
      const matchesRating = salon.rating >= minRating;

      return matchesSearch && matchesCity && matchesService && matchesPriceRange && matchesRating;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          const minPriceA = Math.min(...a.services.map(s => s.price));
          const minPriceB = Math.min(...b.services.map(s => s.price));
          return minPriceA - minPriceB;
        case 'price-high':
          const maxPriceA = Math.max(...a.services.map(s => s.price));
          const maxPriceB = Math.max(...b.services.map(s => s.price));
          return maxPriceB - maxPriceA;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCity, selectedService, priceRange, minRating, sortBy]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-6">
            Rechercher un salon
          </h1>
          
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Nom du salon, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Tous les services</option>
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gamme de prix
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tous les prix</option>
                    <option value="budget">Économique</option>
                    <option value="mid">Modéré</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note minimum
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={0}>Toutes les notes</option>
                    <option value={4}>4+ étoiles</option>
                    <option value={4.5}>4.5+ étoiles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trier par
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="rating">Mieux notés</option>
                    <option value="reviews">Plus d'avis</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredSalons.length} salon{filteredSalons.length > 1 ? 's' : ''} trouvé{filteredSalons.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon, index) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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

                <div className="flex items-center space-x-2 text-secondary-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{salon.district}, {salon.city}</span>
                </div>

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

                <div className="mb-4">
                  <div className="text-sm text-secondary-600">À partir de</div>
                  <div className="text-lg font-bold text-secondary-900">
                    {formatPrice(Math.min(...salon.services.map(s => s.price)))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/salon/${salon.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    Voir détails
                  </Link>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
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

        {filteredSalons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun salon trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonSearch;