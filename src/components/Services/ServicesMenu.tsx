import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Palette, Hand, Sparkles, Heart, Waves, Crown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  services: string[];
  priceRange: string;
}

const ServicesMenu: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'haircut',
      name: t('services.haircut'),
      icon: Scissors,
      description: 'Coupes modernes et classiques',
      color: 'from-blue-500 to-blue-600',
      services: ['Coupe femme', 'Coupe homme', 'Brushing', 'Mise en plis'],
      priceRange: '8 000 - 25 000 FCFA'
    },
    {
      id: 'makeup',
      name: t('services.makeup'),
      icon: Palette,
      description: 'Maquillage professionnel',
      color: 'from-pink-500 to-pink-600',
      services: ['Maquillage jour', 'Maquillage soirée', 'Maquillage mariée', 'Cours de maquillage'],
      priceRange: '15 000 - 50 000 FCFA'
    },
    {
      id: 'manicure',
      name: t('services.manicure'),
      icon: Hand,
      description: 'Soins des ongles et mains',
      color: 'from-purple-500 to-purple-600',
      services: ['Manucure classique', 'Manucure française', 'Pose de vernis', 'Nail art'],
      priceRange: '5 000 - 15 000 FCFA'
    },
    {
      id: 'facial',
      name: t('services.facial'),
      icon: Sparkles,
      description: 'Soins du visage personnalisés',
      color: 'from-green-500 to-green-600',
      services: ['Nettoyage de peau', 'Soin hydratant', 'Soin anti-âge', 'Masque purifiant'],
      priceRange: '10 000 - 30 000 FCFA'
    },
    {
      id: 'massage',
      name: t('services.massage'),
      icon: Heart,
      description: 'Massages relaxants et thérapeutiques',
      color: 'from-orange-500 to-orange-600',
      services: ['Massage relaxant', 'Massage du dos', 'Massage des pieds', 'Massage complet'],
      priceRange: '12 000 - 35 000 FCFA'
    },
    {
      id: 'braids',
      name: t('services.braids'),
      icon: Waves,
      description: 'Tresses africaines traditionnelles',
      color: 'from-yellow-500 to-yellow-600',
      services: ['Tresses collées', 'Tresses libres', 'Box braids', 'Twists'],
      priceRange: '15 000 - 40 000 FCFA'
    },
    {
      id: 'extensions',
      name: t('services.extensions'),
      icon: Crown,
      description: 'Extensions et rajouts capillaires',
      color: 'from-indigo-500 to-indigo-600',
      services: ['Extensions à clips', 'Extensions cousues', 'Rajouts naturels', 'Perruques'],
      priceRange: '20 000 - 80 000 FCFA'
    },
    {
      id: 'coloring',
      name: t('services.coloring'),
      icon: Star,
      description: 'Coloration et décoloration',
      color: 'from-red-500 to-red-600',
      services: ['Coloration permanente', 'Mèches', 'Balayage', 'Décoloration'],
      priceRange: '18 000 - 60 000 FCFA'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <p className="text-primary-600 font-semibold text-sm">
                  {category.priceRange}
                </p>

                {/* Hover Details */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: selectedCategory === category.id ? 1 : 0,
                    height: selectedCategory === category.id ? 'auto' : 0
                  }}
                  className="overflow-hidden mt-4 pt-4 border-t border-gray-200"
                >
                  <ul className="space-y-1">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1 h-1 bg-primary-600 rounded-full mr-2" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à réserver votre service ?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Découvrez nos salons partenaires et réservez votre rendez-vous en quelques clics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/salons"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Voir les salons
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMenu;