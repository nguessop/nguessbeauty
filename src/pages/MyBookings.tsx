import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, MoreVertical, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock bookings data
  const bookings = {
    upcoming: [
      {
        id: '1',
        salon: {
          name: 'Élégance Coiffure',
          address: 'Akwa, Douala',
          phone: '+237 6 XX XX XX XX',
          image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
        },
        service: {
          name: 'Coupe + Brushing',
          duration: 90,
          price: 15000
        },
        staff: {
          name: 'Marie Ngono',
          avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg'
        },
        date: '2025-01-15',
        time: '14:00',
        status: 'confirmed'
      },
      {
        id: '2',
        salon: {
          name: 'Beauty Palace',
          address: 'Bastos, Yaoundé',
          phone: '+237 6 YY YY YY YY',
          image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg'
        },
        service: {
          name: 'Maquillage Soirée',
          duration: 90,
          price: 22000
        },
        staff: {
          name: 'Sandrine Fouda',
          avatar: 'https://images.pexels.com/photos/3992660/pexels-photo-3992660.jpeg'
        },
        date: '2025-01-18',
        time: '16:00',
        status: 'confirmed'
      }
    ],
    past: [
      {
        id: '3',
        salon: {
          name: 'Élégance Coiffure',
          address: 'Akwa, Douala',
          phone: '+237 6 XX XX XX XX',
          image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
        },
        service: {
          name: 'Défrisage',
          duration: 180,
          price: 25000
        },
        staff: {
          name: 'Marie Ngono',
          avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg'
        },
        date: '2025-01-05',
        time: '10:00',
        status: 'completed',
        rating: 5
      }
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Mes réservations
          </h1>
          <p className="text-secondary-600">
            Gérez vos rendez-vous passés et à venir
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                À venir ({bookings.upcoming.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Historique ({bookings.past.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Upcoming Bookings */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {bookings.upcoming.length > 0 ? (
                  bookings.upcoming.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.salon.image}
                            alt={booking.salon.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900">
                              {booking.salon.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-secondary-600 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.salon.address}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <div>
                            <div className="text-sm text-secondary-600">Date</div>
                            <div className="font-medium text-secondary-900">
                              {formatDate(booking.date)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-primary-600" />
                          <div>
                            <div className="text-sm text-secondary-600">Heure</div>
                            <div className="font-medium text-secondary-900">
                              {booking.time}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <img
                            src={booking.staff.avatar}
                            alt={booking.staff.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm text-secondary-600">Professionnel</div>
                            <div className="font-medium text-secondary-900">
                              {booking.staff.name}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-secondary-900">
                              {booking.service.name}
                            </h4>
                            <p className="text-sm text-secondary-600">
                              Durée: {booking.service.duration} min
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {formatPrice(booking.service.price)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                          <Phone className="h-4 w-4" />
                          <span>Appeler</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>WhatsApp</span>
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                          Modifier
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          Annuler
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun rendez-vous à venir
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Vous n'avez pas encore de réservation prévue
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                      Réserver maintenant
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Past Bookings */}
            {activeTab === 'past' && (
              <div className="space-y-6">
                {bookings.past.length > 0 ? (
                  bookings.past.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.salon.image}
                            alt={booking.salon.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900">
                              {booking.salon.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-secondary-600 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.salon.address}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary-600" />
                          <div>
                            <div className="text-sm text-secondary-600">Date</div>
                            <div className="font-medium text-secondary-900">
                              {formatDate(booking.date)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-primary-600" />
                          <div>
                            <div className="text-sm text-secondary-600">Heure</div>
                            <div className="font-medium text-secondary-900">
                              {booking.time}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <img
                            src={booking.staff.avatar}
                            alt={booking.staff.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm text-secondary-600">Professionnel</div>
                            <div className="font-medium text-secondary-900">
                              {booking.staff.name}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-secondary-900">
                              {booking.service.name}
                            </h4>
                            <p className="text-sm text-secondary-600">
                              Durée: {booking.service.duration} min
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {formatPrice(booking.service.price)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {booking.rating ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-secondary-600">Votre note:</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= booking.rating!
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Réserver à nouveau
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Star className="h-4 w-4" />
                            <span>Laisser un avis</span>
                          </button>
                          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Réserver à nouveau
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun historique
                    </h3>
                    <p className="text-gray-600">
                      Vos rendez-vous passés apparaîtront ici
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;