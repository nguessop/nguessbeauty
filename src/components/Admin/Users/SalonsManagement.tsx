import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X, MapPin, Star, Phone, Clock, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const SalonsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Mock data
  const salons = [
    {
      id: '1',
      name: 'Élégance Coiffure',
      owner: 'Marie Ngono',
      email: 'marie@elegance-coiffure.cm',
      phone: '+237 6 XX XX XX XX',
      address: 'Rue de la Réunification, Akwa',
      city: 'Douala',
      district: 'Akwa',
      status: 'active',
      isVerified: true,
      rating: 4.8,
      reviewCount: 127,
      totalBookings: 245,
      monthlyRevenue: 850000,
      registeredAt: '2024-03-15',
      verifiedAt: '2024-03-20',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
    },
    {
      id: '2',
      name: 'Beauty Palace',
      owner: 'Sandrine Fouda',
      email: 'contact@beauty-palace.cm',
      phone: '+237 6 YY YY YY YY',
      address: 'Avenue Kennedy, Bastos',
      city: 'Yaoundé',
      district: 'Bastos',
      status: 'pending',
      isVerified: false,
      rating: 0,
      reviewCount: 0,
      totalBookings: 0,
      monthlyRevenue: 0,
      registeredAt: '2025-01-10',
      verifiedAt: null,
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg'
    },
    {
      id: '3',
      name: 'Glamour Studio',
      owner: 'Fatima Alhadji',
      email: 'info@glamour-studio.cm',
      phone: '+237 6 ZZ ZZ ZZ ZZ',
      address: 'Carrefour Warda, Bali',
      city: 'Douala',
      district: 'Bali',
      status: 'suspended',
      isVerified: true,
      rating: 4.2,
      reviewCount: 67,
      totalBookings: 98,
      monthlyRevenue: 450000,
      registeredAt: '2024-08-10',
      verifiedAt: '2024-08-15',
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString: string | null) => {
    return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : '-';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'pending': return 'En attente';
      case 'suspended': return 'Suspendu';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  };

  const handleApprove = (salonId: string) => {
    console.log('Approving salon:', salonId);
  };

  const handleReject = (salonId: string) => {
    console.log('Rejecting salon:', salonId);
  };

  const handleSuspend = (salonId: string) => {
    console.log('Suspending salon:', salonId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Salons</h1>
          <p className="text-gray-600">Gérez les salons partenaires de la plateforme</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Salons', value: '156', change: '+12%', color: 'blue' },
          { title: 'Salons Actifs', value: '142', change: '+8%', color: 'green' },
          { title: 'En Attente', value: '8', change: '+3%', color: 'yellow' },
          { title: 'Suspendus', value: '6', change: '-2%', color: 'red' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} ce mois
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, propriétaire, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="pending">En attente</option>
            <option value="suspended">Suspendus</option>
            <option value="inactive">Inactifs</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Toutes les villes</option>
            <option value="Douala">Douala</option>
            <option value="Yaoundé">Yaoundé</option>
            <option value="Bafoussam">Bafoussam</option>
            <option value="Bamenda">Bamenda</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filtres avancés</span>
          </button>
        </div>
      </div>

      {/* Salons Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propriétaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salons.map((salon, index) => (
                <motion.tr
                  key={salon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{salon.name}</div>
                        <div className="text-sm text-gray-500">ID: {salon.id}</div>
                        {salon.isVerified && (
                          <div className="flex items-center mt-1">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">Vérifié</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salon.owner}</div>
                    <div className="text-sm text-gray-500">{salon.email}</div>
                    <div className="text-sm text-gray-500">{salon.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {salon.district}, {salon.city}
                    </div>
                    <div className="text-sm text-gray-500">{salon.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {salon.status === 'active' ? (
                      <>
                        <div className="flex items-center text-sm text-gray-900">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {salon.rating} ({salon.reviewCount} avis)
                        </div>
                        <div className="text-sm text-gray-500">{salon.totalBookings} réservations</div>
                        <div className="text-sm text-green-600">{formatCurrency(salon.monthlyRevenue)}/mois</div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">En attente de validation</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(salon.status)}`}>
                      {getStatusText(salon.status)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Inscrit le {formatDate(salon.registeredAt)}
                    </div>
                    {salon.verifiedAt && (
                      <div className="text-xs text-green-600">
                        Vérifié le {formatDate(salon.verifiedAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-primary-600 hover:text-primary-900 p-1 rounded"
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {salon.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(salon.id)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Approuver"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleReject(salon.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Rejeter"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      {salon.status === 'active' && (
                        <button 
                          onClick={() => handleSuspend(salon.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Suspendre"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">10</span> sur{' '}
                <span className="font-medium">156</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Suivant
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonsManagement;