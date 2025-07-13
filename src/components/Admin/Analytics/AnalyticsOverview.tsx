import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../Layout/AdminLayout';

const AnalyticsOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'Revenus Totaux',
      value: '45.2M FCFA',
      change: '+15.3%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Nouveaux Clients',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Réservations',
      value: '5,678',
      change: '+8.2%',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Taux de Conversion',
      value: '23.4%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const topSalons = [
    { name: 'Royal Beauty', revenue: '2.8M FCFA', bookings: 312, growth: '+18%' },
    { name: 'Élégance Coiffure', revenue: '2.1M FCFA', bookings: 245, growth: '+15%' },
    { name: 'Beauty Palace', revenue: '1.9M FCFA', bookings: 189, growth: '+12%' },
    { name: 'Glamour Studio', revenue: '1.5M FCFA', bookings: 156, growth: '+8%' },
    { name: 'Chic & Style', revenue: '1.2M FCFA', bookings: 134, growth: '+5%' }
  ];

  const topServices = [
    { name: 'Coupe + Brushing', bookings: 1234, revenue: '18.5M FCFA', growth: '+22%' },
    { name: 'Maquillage Soirée', bookings: 856, revenue: '18.8M FCFA', growth: '+18%' },
    { name: 'Manucure Française', bookings: 743, revenue: '5.9M FCFA', growth: '+15%' },
    { name: 'Défrisage', bookings: 567, revenue: '14.2M FCFA', growth: '+12%' },
    { name: 'Tresses Africaines', bookings: 432, revenue: '8.6M FCFA', growth: '+8%' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 3200000 },
    { month: 'Fév', revenue: 3800000 },
    { month: 'Mar', revenue: 4100000 },
    { month: 'Avr', revenue: 3900000 },
    { month: 'Mai', revenue: 4500000 },
    { month: 'Juin', revenue: 4800000 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Statistiques & Analytics</h1>
            <p className="text-gray-600">Vue d'ensemble des performances de la plateforme</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">Cette année</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
                  <p className="text-sm text-green-600 font-medium">{stat.change} vs période précédente</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Évolution des Revenus</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
                    style={{ height: `${(data.revenue / 5000000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Répartition par Service</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { name: 'Coiffure', percentage: 35, color: 'bg-blue-500' },
                { name: 'Maquillage', percentage: 25, color: 'bg-purple-500' },
                { name: 'Manucure', percentage: 20, color: 'bg-green-500' },
                { name: 'Soins', percentage: 15, color: 'bg-orange-500' },
                { name: 'Autres', percentage: 5, color: 'bg-gray-500' }
              ].map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${service.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{service.name}</span>
                      <span className="font-medium">{service.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${service.color}`}
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Salons */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Salons</h3>
            <div className="space-y-4">
              {topSalons.map((salon, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{salon.name}</p>
                      <p className="text-sm text-gray-600">{salon.bookings} réservations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{salon.revenue}</p>
                    <p className="text-sm text-green-600">{salon.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Services</h3>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.bookings} réservations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{service.revenue}</p>
                    <p className="text-sm text-green-600">{service.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { action: 'Nouveau salon inscrit', details: 'Beauty Paradise - Yaoundé', time: 'Il y a 2h', type: 'success' },
              { action: 'Pic de réservations', details: '156 réservations en 1h', time: 'Il y a 4h', type: 'info' },
              { action: 'Paiement important', details: '2.5M FCFA - Royal Beauty', time: 'Il y a 6h', type: 'success' },
              { action: 'Problème signalé', details: 'Salon Élégance - Douala', time: 'Il y a 8h', type: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsOverview;