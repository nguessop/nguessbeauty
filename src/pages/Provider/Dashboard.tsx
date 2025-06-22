import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Clock, Bell, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DashboardStats {
  todayAppointments: number;
  weekRevenue: number;
  monthRevenue: number;
  noShowRate: number;
  totalClients: number;
  averageRating: number;
}

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

const ProviderDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [stats, setStats] = useState<DashboardStats>({
    todayAppointments: 8,
    weekRevenue: 125000,
    monthRevenue: 450000,
    noShowRate: 5.2,
    totalClients: 156,
    averageRating: 4.8
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'Aminata Diallo',
      clientPhone: '+237 6XX XXX XXX',
      serviceName: 'Coupe + Brushing',
      staffName: 'Marie Ngono',
      date: '2025-01-15',
      time: '09:00',
      duration: 90,
      price: 15000,
      status: 'confirmed'
    },
    {
      id: '2',
      clientName: 'Grace Mballa',
      clientPhone: '+237 6YY YYY YYY',
      serviceName: 'Maquillage Soirée',
      staffName: 'Sandrine Fouda',
      date: '2025-01-15',
      time: '14:00',
      duration: 90,
      price: 22000,
      status: 'pending'
    },
    {
      id: '3',
      clientName: 'Fatima Alhadji',
      clientPhone: '+237 6ZZ ZZZ ZZZ',
      serviceName: 'Manucure Française',
      staffName: 'Marie Ngono',
      date: '2025-01-16',
      time: '10:30',
      duration: 60,
      price: 8000,
      status: 'confirmed'
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      case 'no-show': return 'Absent';
      default: return status;
    }
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      isSameDay(parseISO(apt.date), date)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Tableau de bord</h1>
            <p className="text-secondary-600">Gérez votre salon et vos rendez-vous</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nouveau RDV</span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">{stats.todayAppointments}</div>
                <div className="text-sm text-secondary-600">RDV aujourd'hui</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">{formatPrice(stats.weekRevenue)}</div>
                <div className="text-sm text-secondary-600">CA cette semaine</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">{stats.totalClients}</div>
                <div className="text-sm text-secondary-600">Clients ce mois</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">{stats.noShowRate}%</div>
                <div className="text-sm text-secondary-600">Taux d'absence</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-secondary-900">Planning</h2>
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['day', 'week', 'month'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as any)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === mode
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {mode === 'day' ? 'Jour' : mode === 'week' ? 'Semaine' : 'Mois'}
                    </button>
                  ))}
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  <span>Filtrer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Week View */}
          {viewMode === 'week' && (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {format(getWeekDays()[0], 'd MMMM', { locale: fr })} - {format(getWeekDays()[6], 'd MMMM yyyy', { locale: fr })}
                </h3>
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {getWeekDays().map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 min-h-[200px]">
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-gray-600">
                        {format(day, 'EEE', { locale: fr })}
                      </div>
                      <div className={`text-lg font-bold ${
                        isSameDay(day, new Date()) ? 'text-primary-600' : 'text-secondary-900'
                      }`}>
                        {format(day, 'd')}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {getAppointmentsForDate(day).map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-2 bg-primary-50 border border-primary-200 rounded text-xs"
                        >
                          <div className="font-medium text-primary-900">{appointment.time}</div>
                          <div className="text-primary-700">{appointment.clientName}</div>
                          <div className="text-primary-600">{appointment.serviceName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary-900">Rendez-vous récents</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                        <div className="text-sm text-gray-500">{appointment.clientPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.serviceName}</div>
                      <div className="text-sm text-gray-500">{appointment.duration} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.staffName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(parseISO(appointment.date), 'dd/MM/yyyy', { locale: fr })}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(appointment.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">Modifier</button>
                        <button className="text-red-600 hover:text-red-900">Annuler</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;