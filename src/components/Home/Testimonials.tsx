import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Aminata Diallo',
      location: 'Douala',
      rating: 5,
      comment: 'Excellente plateforme ! J\'ai trouvé mon salon préféré en quelques minutes. La réservation est très simple et les rappels WhatsApp sont très pratiques.',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
      service: 'Coiffure'
    },
    {
      id: 2,
      name: 'Grace Mballa',
      location: 'Yaoundé',
      rating: 5,
      comment: 'Je recommande vivement ! Les salons sont de qualité et le paiement par Orange Money est très pratique. Plus besoin de chercher partout.',
      avatar: 'https://images.pexels.com/photos/3992644/pexels-photo-3992644.jpeg',
      service: 'Maquillage'
    },
    {
      id: 3,
      name: 'Fatima Alhadji',
      location: 'Bafoussam',
      rating: 5,
      comment: 'Application parfaite pour nos besoins au Cameroun. Interface claire, salons vérifiés et service client réactif. Bravo à l\'équipe !',
      avatar: 'https://images.pexels.com/photos/3992659/pexels-photo-3992659.jpeg',
      service: 'Soins visage'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos utilisateurs satisfaits à travers le Cameroun
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-200">
                <Quote className="h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-secondary-700 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                  <div className="text-sm text-secondary-600">{testimonial.location}</div>
                  <div className="text-xs text-primary-600 font-medium">{testimonial.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-primary-100">Note moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-primary-100">Avis clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-primary-100">Rendez-vous réalisés</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;