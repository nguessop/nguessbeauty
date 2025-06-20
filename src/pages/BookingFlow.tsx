import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, CreditCard, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSameDay, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { mockSalons } from '../data/mockData';

const BookingFlow: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const salon = mockSalons.find(s => s.id === salonId);

  if (!salon) {
    return <div>Salon non trouvé</div>;
  }

  const selectedServiceData = salon.services.find(s => s.id === selectedService);
  const selectedStaffData = salon.staff.find(s => s.id === selectedStaff);

  // Generate available dates (next 30 days)
  const availableDates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));

  // Generate time slots
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    // Simulate booking creation
    const bookingId = 'booking-' + Date.now();
    navigate(`/booking-confirmation/${bookingId}`);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService && selectedStaff;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return customerInfo.name && customerInfo.phone;
      case 4:
        return paymentMethod;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: 'Service & Professionnel', icon: User },
    { number: 2, title: 'Date & Heure', icon: Calendar },
    { number: 3, title: 'Informations', icon: User },
    { number: 4, title: 'Paiement', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </button>
          
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Réserver chez {salon.name}
          </h1>
          <p className="text-secondary-600">{salon.address}, {salon.city}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Service & Staff */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  Choisissez votre service et professionnel
                </h2>

                {/* Services */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salon.services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedService === service.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-secondary-900">{service.name}</h4>
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                        <p className="text-secondary-600 text-sm mb-2">{service.description}</p>
                        <p className="text-secondary-500 text-sm">Durée: {service.duration} min</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Staff */}
                {selectedService && (
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Professionnel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {salon.staff
                        .filter(staff => 
                          selectedServiceData?.staffIds.includes(staff.id)
                        )
                        .map((staff) => (
                          <div
                            key={staff.id}
                            onClick={() => setSelectedStaff(staff.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedStaff === staff.id
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={staff.avatar}
                                alt={staff.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-secondary-900">{staff.name}</h4>
                                <div className="flex items-center space-x-1 mb-1">
                                  <span className="text-yellow-400">★</span>
                                  <span className="text-sm font-medium">{staff.rating}</span>
                                </div>
                                <p className="text-sm text-secondary-600">
                                  {staff.experience} ans d'expérience
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  Choisissez la date et l'heure
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Date</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {availableDates.slice(0, 21).map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 text-center rounded-lg transition-colors ${
                            selectedDate && isSameDay(date, selectedDate)
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                          }`}
                        >
                          <div className="text-xs text-gray-500">
                            {format(date, 'EEE', { locale: fr })}
                          </div>
                          <div className="font-semibold">
                            {format(date, 'd')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                        Créneaux disponibles
                      </h3>
                      <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-center rounded-lg transition-colors ${
                              selectedTime === time
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Customer Info */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  Vos informations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+237 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes spéciales (optionnel)
                    </label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Demandes particulières, allergies, etc."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  Mode de paiement
                </h2>

                <div className="space-y-4">
                  {[
                    { id: 'cash', name: 'Paiement sur place', description: 'Payez directement au salon' },
                    { id: 'orange-money', name: 'Orange Money', description: 'Paiement mobile sécurisé' },
                    { id: 'mtn-momo', name: 'MTN Mobile Money', description: 'Paiement mobile sécurisé' },
                    { id: 'card', name: 'Carte bancaire', description: 'Visa, Mastercard' }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === method.id
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-900">{method.name}</h4>
                          <p className="text-sm text-secondary-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Récapitulatif de votre réservation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Service:</span>
                      <span className="font-medium">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Professionnel:</span>
                      <span className="font-medium">{selectedStaffData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Date:</span>
                      <span className="font-medium">
                        {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Heure:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Durée:</span>
                      <span className="font-medium">{selectedServiceData?.duration} min</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-lg font-semibold text-secondary-900">Total:</span>
                      <span className="text-lg font-bold text-primary-600">
                        {selectedServiceData && formatPrice(selectedServiceData.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Précédent</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                canProceed()
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Suivant</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleBooking}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                canProceed()
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check className="h-5 w-5" />
              <span>Confirmer la réservation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;