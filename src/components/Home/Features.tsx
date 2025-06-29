import React from 'react';
import { Calendar, Shield, CreditCard, MessageCircle, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Réservation facile',
      description: 'Réservez votre rendez-vous en quelques clics, 24h/24 et 7j/7',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CreditCard,
      title: 'Paiement sécurisé',
      description: 'Orange Money, MTN MoMo, carte bancaire ou paiement sur place',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: MessageCircle,
      title: 'Notifications automatiques',
      description: 'Rappels SMS et WhatsApp avant vos rendez-vous',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Star,
      title: 'Avis vérifiés',
      description: 'Consultez les avis authentiques de nos clients',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Shield,
      title: 'Salons certifiés',
      description: 'Tous nos partenaires respectent nos standards de qualité',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Clock,
      title: 'Support 24/7',
      description: 'Notre équipe est disponible pour vous aider à tout moment',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Pourquoi choisir NGUESSBEAUTY ?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Une expérience de réservation moderne, sécurisée et adaptée aux besoins du marché camerounais
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
              Prêt à découvrir votre nouveau salon préféré ?
            </h3>
            <p className="text-xl text-secondary-600 mb-8">
              Rejoignez des milliers de clients satisfaits qui font confiance à NGUESSBEAUTY
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Commencer maintenant
              </button>
              <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;