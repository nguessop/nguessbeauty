import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Filter, X, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Loader } from '@googlemaps/js-api-loader';
import Select from 'react-select';

interface SearchFilters {
  query: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  service: string;
  priceRange: string;
  rating: number;
  distance: number;
  amenities: string[];
  availability: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, isOpen, onClose }) => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    service: '',
    priceRange: '',
    rating: 0,
    distance: 10,
    amenities: [],
    availability: ''
  });

  const serviceOptions = [
    { value: 'haircut', label: t('services.haircut') },
    { value: 'makeup', label: t('services.makeup') },
    { value: 'manicure', label: t('services.manicure') },
    { value: 'pedicure', label: t('services.pedicure') },
    { value: 'facial', label: t('services.facial') },
    { value: 'massage', label: t('services.massage') },
    { value: 'braids', label: t('services.braids') },
    { value: 'extensions', label: t('services.extensions') },
    { value: 'coloring', label: t('services.coloring') }
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'parking', label: 'Parking' },
    { value: 'ac', label: 'Climatisation' },
    { value: 'organic', label: 'Produits bio' },
    { value: 'wheelchair', label: 'Accès handicapé' },
    { value: 'payment_card', label: 'Paiement carte' },
    { value: 'mobile_money', label: 'Mobile Money' }
  ];

  const priceRangeOptions = [
    { value: 'budget', label: 'Économique (< 15 000 FCFA)' },
    { value: 'mid', label: 'Modéré (15 000 - 30 000 FCFA)' },
    { value: 'premium', label: 'Premium (> 30 000 FCFA)' }
  ];

  useEffect(() => {
    if (isOpen && mapRef.current) {
      initializeMap();
    }
  }, [isOpen]);

  const initializeMap = async () => {
    try {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();
      
      // Default to Douala, Cameroon
      const defaultCenter = { lat: 4.0511, lng: 9.7679 };
      
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: defaultCenter,
        zoom: 12,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(mapInstance);

      // Add click listener to map
      mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          updateMarker(event.latLng);
          reverseGeocode(event.latLng);
        }
      });

      // Initialize autocomplete for location input
      const locationInput = document.getElementById('location-input') as HTMLInputElement;
      if (locationInput) {
        const autocompleteInstance = new google.maps.places.Autocomplete(locationInput, {
          types: ['geocode'],
          componentRestrictions: { country: 'cm' } // Restrict to Cameroon
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.geometry?.location) {
            updateMarker(place.geometry.location);
            mapInstance.setCenter(place.geometry.location);
            setFilters(prev => ({
              ...prev,
              location: place.formatted_address || '',
              coordinates: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng()
              }
            }));
          }
        });

        setAutocomplete(autocompleteInstance);
      }

    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  const updateMarker = (position: google.maps.LatLng) => {
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new google.maps.Marker({
      position,
      map,
      title: 'Position sélectionnée'
    });

    setMarker(newMarker);
  };

  const reverseGeocode = async (position: google.maps.LatLng) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: position });
      
      if (response.results[0]) {
        setFilters(prev => ({
          ...prev,
          location: response.results[0].formatted_address,
          coordinates: {
            lat: position.lat(),
            lng: position.lng()
          }
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (map) {
            const latLng = new google.maps.LatLng(pos.lat, pos.lng);
            map.setCenter(latLng);
            updateMarker(latLng);
            reverseGeocode(latLng);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      location: '',
      service: '',
      priceRange: '',
      rating: 0,
      distance: 10,
      amenities: [],
      availability: ''
    });
    
    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('search.advancedSearch')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex h-[600px]">
              {/* Filters Panel */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Search Query */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recherche générale
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        value={filters.query}
                        onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Nom du salon, service..."
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          id="location-input"
                          type="text"
                          value={filters.location}
                          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Adresse, ville, quartier..."
                        />
                      </div>
                      <button
                        onClick={getCurrentLocation}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        title={t('search.nearMe')}
                      >
                        <Navigation className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('search.service')}
                    </label>
                    <Select
                      value={serviceOptions.find(option => option.value === filters.service)}
                      onChange={(option) => setFilters(prev => ({ ...prev, service: option?.value || '' }))}
                      options={serviceOptions}
                      placeholder="Choisir un service"
                      isClearable
                      className="text-sm"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('search.priceRange')}
                    </label>
                    <Select
                      value={priceRangeOptions.find(option => option.value === filters.priceRange)}
                      onChange={(option) => setFilters(prev => ({ ...prev, priceRange: option?.value || '' }))}
                      options={priceRangeOptions}
                      placeholder="Gamme de prix"
                      isClearable
                      className="text-sm"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('search.rating')}
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFilters(prev => ({ ...prev, rating }))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.rating >= rating
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {rating}+ ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance maximale: {filters.distance} km
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={filters.distance}
                      onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Équipements
                    </label>
                    <Select
                      isMulti
                      value={amenityOptions.filter(option => filters.amenities.includes(option.value))}
                      onChange={(options) => setFilters(prev => ({ 
                        ...prev, 
                        amenities: options ? options.map(opt => opt.value) : [] 
                      }))}
                      options={amenityOptions}
                      placeholder="Sélectionner les équipements"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Map Panel */}
              <div className="w-1/2 border-l border-gray-200">
                <div ref={mapRef} className="w-full h-full" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Réinitialiser
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {t('common.search')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedSearch;