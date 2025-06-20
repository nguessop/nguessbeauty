import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Phone, MessageCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();

  // Mock booking data - in real app, fetch from API
  const booking = {
    id: bookingId,
    salon: {
      name: 'Élégance Coiffure',
      address: 'Rue de la Réunification, Akwa, Douala',
      phone: '+237 6 XX XX XX XX',
      whatsapp: '+237 6 XX XX XX XX'
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
    customer: {
      name: 'Aminata Diallo',
      phone: '+237 6 XX XX XX XX'
    },
    paymentMethod: 'Orange Money',
    status: 'confirmed'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Réservation confirmée !
          </h1>
          <p className="text-secondary-600">
            Votre rendez-vous a été enregistré avec succès
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-secondary-900">
              Détails de votre rendez-vous
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              Confirmé
            </span>
          </div>

          <div className="space-y-4">
            {/* Salon Info */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">{booking.salon.name}</h3>
                <p className="text-secondary-600 text-sm">{booking.salon.address}</p>
              </div>
            </div>

            {/* Service & Staff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-secondary-900 mb-2">Service</h4>
                <p className="text-secondary-700">{booking.service.name}</p>
                <p className="text-sm text-secondary-600">
                  Durée: {booking.service.duration} min
                </p>
                <p className="text-lg font-bold text-primary-600 mt-2">
                  {formatPrice(booking.service.price)}
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-secondary-900 mb-2">Professionnel</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={booking.staff.avatar}
                    alt={booking.staff.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-secondary-700">{booking.staff.name}</span>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <Calendar className="h-6 w-6 text-primary-600" />
                <div>
                  <h4 className="font-semibold text-secondary-900">Date</h4>
                  <p className="text-secondary-700">{formatDate(booking.date)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <Clock className="h-6 w-6 text-primary-600" />
                <div>
                  <h4 className="font-semibold text-secondary-900">Heure</h4>
                  <p className="text-secondary-700">{booking.time}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-secondary-900 mb-2">Mode de paiement</h4>
              <p className="text-secondary-700">{booking.paymentMethod}</p>
            </div>
          </div>
        </motion.div>

        {/* Notifications Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">
            Notifications automatiques
          </h3>
          <div className="space-y-2 text-sm text-secondary-700">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span>SMS de confirmation envoyé</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span>Rappel WhatsApp 24h avant le rendez-vous</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span>SMS de rappel 2h avant le rendez-vous</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Besoin de modifier ou annuler ?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary-600" />
              <span className="text-secondary-700">Appelez le salon: {booking.salon.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span className="text-secondary-700">WhatsApp: {booking.salon.whatsapp}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Merci de prévenir au moins 2h à l'avance en cas d'annulation ou de retard.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            <Download className="h-5 w-5" />
            <span>Télécharger le récapitulatif</span>
          </button>
          
          <Link
            to="/mes-reservations"
            className="flex-1 flex items-center justify-center space-x-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Calendar className="h-5 w-5" />
            <span>Mes réservations</span>
          </Link>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;