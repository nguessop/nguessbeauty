import React from 'react';
import { motion } from 'framer-motion';
import { serviceCategories } from '../../data/mockData';

const ServiceCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Nos services
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Explorez notre large gamme de services beauté disponibles dans nos salons partenaires
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-secondary-900 text-center mb-8">
            Services les plus demandés
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Coupe + Brushing',
                description: 'Coupe moderne avec brushing professionnel',
                price: 'À partir de 15 000 FCFA',
                image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
                popular: true
              },
              {
                name: 'Maquillage Soirée',
                description: 'Maquillage professionnel pour vos événements',
                price: 'À partir de 20 000 FCFA',
                image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg',
                popular: true
              },
              {
                name: 'Manucure Française',
                description: 'Manucure classique avec vernis français',
                price: 'À partir de 8 000 FCFA',
                image: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg',
                popular: false
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {service.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Populaire
                    </span>
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-secondary-900 mb-2">{service.name}</h4>
                  <p className="text-secondary-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">{service.price}</span>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Réserver
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;