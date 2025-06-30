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
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
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
      status: 'pending'
    },
    {
      id: 2,
      type: 'booking',
      message: '1,234 nouvelles réservations aujourd\'hui',
      time: 'Il y a 4h',
      status: 'success'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Paiement de 2.5M FCFA reçu',
      time: 'Il y a 6h',
      status: 'success'
    },
    {
      id: 4,
      type: 'issue',
      message: 'Problème signalé au salon "Élégance"',
      time: 'Il y a 8h',
      status: 'warning'
    }
  ];

  const topSalons = [
    {
      id: 1,
      name: 'Royal Beauty',
      city: 'Yaoundé',
      revenue: '2.8M FCFA',
      bookings: 312,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Élégance Coiffure',
      city: 'Douala',
      revenue: '2.1M FCFA',
      bookings: 245,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Beauty Palace',
      city: 'Yaoundé',
      revenue: '1.9M FCFA',
      bookings: 189,
      rating: 4.6
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'map', label: 'Carte des salons', icon: MapPin },
    { id: 'analytics', label: 'Analytiques', icon: PieChart }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Administrateur
          </h1>
          <p className="text-gray-600">
            Gérez et supervisez la plateforme NGUESSBEAUTY
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
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
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Activités récentes
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'success' ? 'bg-green-500' :
                            activity.status === 'warning' ? 'bg-yellow-500' :
                            activity.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                          }`} />
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Top Salons ce mois
                    </h3>
                    <div className="space-y-4">
                      {topSalons.map((salon, index) => (
                        <div key={salon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{salon.name}</p>
                              <p className="text-sm text-gray-600">{salon.city}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{salon.revenue}</p>
                            <p className="text-sm text-gray-600">{salon.bookings} RDV</p>
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
    </div>
  );
};

export default AdminDashboard;