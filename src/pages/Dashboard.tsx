import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Clients totaux',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Rendez-vous aujourd\'hui',
      value: '23',
      change: '+5%',
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Revenus du mois',
      value: '45,678 €',
      change: '+18%',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Taux de croissance',
      value: '23.5%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Bienvenue sur votre tableau de bord NGUESSBEAUTY
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change} ce mois
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rendez-vous récents
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Jane Doe</p>
                  <p className="text-sm text-gray-600">Coupe + Coloration</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">14:30</p>
                  <p className="text-xs text-gray-500">Aujourd'hui</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Services populaires
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Coupe femme', bookings: 45 },
              { name: 'Coloration', bookings: 32 },
              { name: 'Manucure', bookings: 28 }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{service.name}</span>
                <span className="text-sm text-gray-600">{service.bookings} réservations</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;