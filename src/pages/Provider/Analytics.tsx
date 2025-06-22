import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, Clock, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    growth: number;
  };
  appointments: {
    total: number;
    completed: number;
    cancelled: number;
    noShow: number;
    noShowRate: number;
  };
  clients: {
    total: number;
    new: number;
    returning: number;
    retention: number;
  };
  services: {
    name: string;
    count: number;
    revenue: number;
    growth: number;
  }[];
  staff: {
    name: string;
    appointments: number;
    revenue: number;
    rating: number;
  }[];
  timeSlots: {
    hour: string;
    appointments: number;
  }[];
}

const ProviderAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month');
  
  const [analytics] = useState<AnalyticsData>({
    revenue: {
      daily: 45000,
      weekly: 285000,
      monthly: 1250000,
      growth: 12.5
    },
    appointments: {
      total: 156,
      completed: 142,
      cancelled: 8,
      noShow: 6,
      noShowRate: 3.8
    },
    clients: {
      total: 89,
      new: 23,
      returning: 66,
      retention: 74.2
    },
    services: [
      { name: 'Coupe + Brushing', count: 45, revenue: 675000, growth: 8.2 },
      { name: 'Maquillage', count: 28, revenue: 616000, growth: 15.3 },
      { name: 'Manucure', count: 38, revenue: 304000, growth: -2.1 },
      { name: 'Défrisage', count: 18, revenue: 450000, growth: 22.1 },
      { name: 'Tresses', count: 27, revenue: 540000, growth: 5.7 }
    ],
    staff: [
      { name: 'Marie Ngono', appointments: 58, revenue: 580000, rating: 4.9 },
      { name: 'Grace Mballa', appointments: 42, revenue: 420000, rating: 4.7 },
      { name: 'Sandrine Fouda', appointments: 35, revenue: 350000, rating: 4.5 }
    ],
    timeSlots: [
      { hour: '08:00', appointments: 8 },
      { hour: '09:00', appointments: 12 },
      { hour: '10:00', appointments: 15 },
      { hour: '11:00', appointments: 18 },
      { hour: '12:00', appointments: 6 },
      { hour: '13:00', appointments: 4 },
      { hour: '14:00', appointments: 22 },
      { hour: '15:00', appointments: 25 },
      { hour: '16:00', appointments: 20 },
      { hour: '17:00', appointments: 16 },
      { hour: '18:00', appointments: 10 }
    ]
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? ArrowUp : ArrowDown;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Statistiques & Rapports</h1>
            <p className="text-secondary-600">Analysez les performances de votre salon</p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['day', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'day' ? 'Jour' : period === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center space-x-1 ${getGrowthColor(analytics.revenue.growth)}`}>
                {React.createElement(getGrowthIcon(analytics.revenue.growth), { className: "h-4 w-4" })}
                <span className="text-sm font-medium">{Math.abs(analytics.revenue.growth)}%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 mb-1">
              {formatPrice(analytics.revenue[selectedPeriod === 'day' ? 'daily' : selectedPeriod === 'week' ? 'weekly' : 'monthly'])}
            </div>
            <div className="text-sm text-secondary-600">
              Chiffre d'affaires {selectedPeriod === 'day' ? 'du jour' : selectedPeriod === 'week' ? 'de la semaine' : 'du mois'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-green-600 flex items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm font-medium">5.2%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 mb-1">{analytics.appointments.total}</div>
            <div className="text-sm text-secondary-600">Rendez-vous ce mois</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-green-600 flex items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm font-medium">8.1%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 mb-1">{analytics.clients.total}</div>
            <div className="text-sm text-secondary-600">Clients ce mois</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-red-600 flex items-center space-x-1">
                <ArrowDown className="h-4 w-4" />
                <span className="text-sm font-medium">1.2%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 mb-1">{analytics.appointments.noShowRate}%</div>
            <div className="text-sm text-secondary-600">Taux d'absence</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Services Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Services les plus demandés</h2>
            <div className="space-y-4">
              {analytics.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-secondary-900">{service.name}</div>
                    <div className="text-sm text-secondary-600">{service.count} réservations</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-secondary-900">{formatPrice(service.revenue)}</div>
                    <div className={`text-sm flex items-center space-x-1 ${getGrowthColor(service.growth)}`}>
                      {React.createElement(getGrowthIcon(service.growth), { className: "h-3 w-3" })}
                      <span>{Math.abs(service.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Staff Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Performance de l'équipe</h2>
            <div className="space-y-4">
              {analytics.staff.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-secondary-900">{member.name}</div>
                    <div className="flex items-center space-x-2 text-sm text-secondary-600">
                      <span>{member.appointments} RDV</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{member.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-secondary-900">{formatPrice(member.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Répartition des rendez-vous</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Terminés</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.appointments.completed / analytics.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.appointments.completed}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Annulés</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.appointments.cancelled / analytics.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.appointments.cancelled}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-700">Absents</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.appointments.noShow / analytics.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{analytics.appointments.noShow}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Peak Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Heures de pointe</h2>
            <div className="space-y-3">
              {analytics.timeSlots.map((slot, index) => {
                const maxAppointments = Math.max(...analytics.timeSlots.map(s => s.appointments));
                const percentage = (slot.appointments / maxAppointments) * 100;
                
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-secondary-700 w-12">{slot.hour}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 w-8">{slot.appointments}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProviderAnalytics;