import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/Admin/Layout/AdminLayout';
import SalonMap from '../../components/Admin/SalonMap';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Salons',
      value: '156',
      change: '+12%',
      changeType: 'increase',
      icon: Building2,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Clients Actifs',
      value: '8,234',
      change: '+18%',
      changeType: 'increase',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Réservations ce mois',
      value: '2,847',
      change: '+25%',
      changeType: 'increase',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Revenus totaux',
      value: '45.2M FCFA',
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Taux de croissance',
      value: '23.5%',
      change: '+2.3%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Salons en attente',
      value: '12',
      change: '-5%',
      changeType: 'decrease',
      icon: Activity,
      color: 'from-red-500 to-red-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new_salon',
      message: 'Nouveau salon "Beauty Paradise" inscrit',
      time: 'Il y a 2h',
      status: 'pending',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'booking',
      message: '1,234 nouvelles réservations aujourd\'hui',
      time: 'Il y a 4h',
      status: 'success',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Paiement de 2.5M FCFA reçu',
      time: 'Il y a 6h',
      status: 'success',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'issue',
      message: 'Problème signalé au salon "Élégance"',
      time: 'Il y a 8h',
      status: 'warning',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    }
  ];

  const topSalons = [
    {
      id: 1,
      name: 'Royal Beauty',
      city: 'Yaoundé',
      revenue: '2.8M FCFA',
      bookings: 312,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg'
    },
    {
      id: 2,
      name: 'Élégance Coiffure',
      city: 'Douala',
      revenue: '2.1M FCFA',
      bookings: 245,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
    },
    {
      id: 3,
      name: 'Beauty Palace',
      city: 'Yaoundé',
      revenue: '1.9M FCFA',
      bookings: 189,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg'
    }
  ];

  const quickActions = [
    { title: 'Valider les salons', count: 8, color: 'bg-yellow-500', link: '/admin/users/salons' },
    { title: 'Modérer les avis', count: 15, color: 'bg-red-500', link: '/admin/reviews/moderation' },
    { title: 'Support tickets', count: 3, color: 'bg-blue-500', link: '/admin/support/tickets' },
    { title: 'Paiements en attente', count: 12, color: 'bg-purple-500', link: '/admin/payments/pending' }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'map', label: 'Carte des salons', icon: MapPin },
    { id: 'analytics', label: 'Analytiques', icon: PieChart }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-600">
              Gérez et supervisez la plateforme NGUESSBEAUTY
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Dernière mise à jour</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{action.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{action.count}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${action.color}`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <div className="flex items-center mt-2">
                            {stat.changeType === 'increase' ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${
                              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change} ce mois
                            </span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Activités récentes
                      </h3>
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'success' ? 'bg-green-100' :
                            activity.status === 'warning' ? 'bg-yellow-100' :
                            activity.status === 'pending' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <activity.icon className={`h-4 w-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Salons */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Top Salons ce mois
                      </h3>
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="space-y-4">
                      {topSalons.map((salon, index) => (
                        <div key={salon.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <img
                              src={salon.image}
                              alt={salon.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{salon.name}</p>
                              <p className="text-sm text-gray-600">{salon.city}</p>
                            </div>
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-bold text-green-600">{salon.revenue}</p>
                            <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                              <span>{salon.bookings} RDV</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                <span>{salon.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map Tab */}
            {activeTab === 'map' && (
              <div className="h-[600px]">
                <SalonMap />
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analytiques avancées
                  </h3>
                  <p className="text-gray-600">
                    Les graphiques et analyses détaillées seront bientôt disponibles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;