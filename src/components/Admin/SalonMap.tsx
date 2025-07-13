import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Filter, MapPin, Star, Phone, Clock, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        💄
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

interface SalonMapData {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  coordinates: [number, number];
  rating: number;
  reviewCount: number;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  totalBookings: number;
  monthlyRevenue: number;
  services: string[];
  openingHours: string;
  image: string;
}

const mockSalonsData: SalonMapData[] = [
  {
    id: '1',
    name: 'Élégance Coiffure',
    address: 'Rue de la Réunification, Akwa',
    city: 'Douala',
    district: 'Akwa',
    coordinates: [4.0511, 9.7679],
    rating: 4.8,
    reviewCount: 127,
    phone: '+237 6 XX XX XX XX',
    status: 'active',
    totalBookings: 245,
    monthlyRevenue: 850000,
    services: ['Coiffure', 'Défrisage', 'Tresses'],
    openingHours: '08:00 - 18:00',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
  },
  {
    id: '2',
    name: 'Beauty Palace',
    address: 'Avenue Kennedy, Bastos',
    city: 'Yaoundé',
    district: 'Bastos',
    coordinates: [3.8480, 11.5021],
    rating: 4.6,
    reviewCount: 89,
    phone: '+237 6 YY YY YY YY',
    status: 'active',
    totalBookings: 189,
    monthlyRevenue: 720000,
    services: ['Maquillage', 'Soins visage', 'Manucure'],
    openingHours: '09:00 - 17:00',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg'
  },
  {
    id: '3',
    name: 'Glamour Studio',
    address: 'Carrefour Warda, Bali',
    city: 'Douala',
    district: 'Bali',
    coordinates: [4.0611, 9.7579],
    rating: 4.4,
    reviewCount: 156,
    phone: '+237 6 ZZ ZZ ZZ ZZ',
    status: 'pending',
    totalBookings: 98,
    monthlyRevenue: 450000,
    services: ['Coiffure', 'Extensions', 'Maquillage'],
    openingHours: '08:30 - 19:00',
    image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg'
  },
  {
    id: '4',
    name: 'Royal Beauty',
    address: 'Quartier Mvog-Ada',
    city: 'Yaoundé',
    district: 'Mvog-Ada',
    coordinates: [3.8380, 11.5121],
    rating: 4.9,
    reviewCount: 203,
    phone: '+237 6 AA AA AA AA',
    status: 'active',
    totalBookings: 312,
    monthlyRevenue: 950000,
    services: ['Coiffure', 'Soins', 'Spa'],
    openingHours: '07:00 - 20:00',
    image: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg'
  },
  {
    id: '5',
    name: 'Chic & Style',
    address: 'Rue Joss, Bonanjo',
    city: 'Douala',
    district: 'Bonanjo',
    coordinates: [4.0411, 9.7779],
    rating: 4.2,
    reviewCount: 67,
    phone: '+237 6 BB BB BB BB',
    status: 'inactive',
    totalBookings: 45,
    monthlyRevenue: 280000,
    services: ['Coiffure', 'Manucure'],
    openingHours: '09:00 - 16:00',
    image: 'https://images.pexels.com/photos/3992644/pexels-photo-3992644.jpeg'
  }
];

const SalonMap: React.FC = () => {
  const [salons, setSalons] = useState<SalonMapData[]>(mockSalonsData);
  const [filteredSalons, setFilteredSalons] = useState<SalonMapData[]>(mockSalonsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSalon, setSelectedSalon] = useState<SalonMapData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([4.0511, 9.7679]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter salons based on search criteria
  useEffect(() => {
    let filtered = salons;

    if (searchQuery) {
      filtered = filtered.filter(salon =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(salon => salon.city === selectedCity);
    }

    if (selectedStatus) {
      filtered = filtered.filter(salon => salon.status === selectedStatus);
    }

    setFilteredSalons(filtered);
  }, [searchQuery, selectedCity, selectedStatus, salons]);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981'; // Green
      case 'pending': return '#F59E0B'; // Yellow
      case 'inactive': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const handleSalonClick = (salon: SalonMapData) => {
    setSelectedSalon(salon);
    setMapCenter(salon.coordinates);
  };

  const cities = [...new Set(salons.map(salon => salon.city))];

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filters */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un salon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Toutes les villes</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="pending">En attente</option>
            <option value="inactive">Inactif</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>{filteredSalons.length} salon{filteredSalons.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Salon List */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Salons ({filteredSalons.length})
            </h3>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-20 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSalons.map((salon, index) => (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSalonClick(salon)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedSalon?.id === salon.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {salon.name}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(salon.status)}`}>
                            {getStatusText(salon.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{salon.rating}</span>
                          <span className="text-xs text-gray-500">({salon.reviewCount})</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{salon.district}, {salon.city}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-blue-500" />
                            <span>{salon.totalBookings} RDV</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-green-600 font-medium">
                              {formatCurrency(salon.monthlyRevenue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={mapCenter}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredSalons.map((salon) => (
              <Marker
                key={salon.id}
                position={salon.coordinates}
                icon={createCustomIcon(getMarkerColor(salon.status))}
                eventHandlers={{
                  click: () => handleSalonClick(salon),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[250px]">
                    <div className="flex items-start space-x-3 mb-3">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900">{salon.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(salon.status)}`}>
                            {getStatusText(salon.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{salon.rating}</span>
                          <span className="text-sm text-gray-500">({salon.reviewCount} avis)</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{salon.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span>{salon.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>{salon.openingHours}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Services:</div>
                      <div className="flex flex-wrap gap-1">
                        {salon.services.map((service, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
                      <div>
                        <div className="text-gray-600">Réservations</div>
                        <div className="font-bold text-blue-600">{salon.totalBookings}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">CA mensuel</div>
                        <div className="font-bold text-green-600">
                          {formatCurrency(salon.monthlyRevenue)}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Voir détails
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-10">
            <h4 className="font-semibold text-gray-900 mb-2">Légende</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Actif</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>En attente</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Inactif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonMap;