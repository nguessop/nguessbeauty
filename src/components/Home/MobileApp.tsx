import React from 'react';
import { Smartphone, Download, Bell, MapPin, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileApp: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Bientôt sur mobile
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Une application mobile native optimisée pour le marché camerounais, 
                avec mode hors-ligne et intégration Mobile Money complète.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: Bell,
                  title: 'Notifications push',
                  description: 'Rappels automatiques et promotions personnalisées'
                },
                {
                  icon: MapPin,
                  title: 'Géolocalisation',
                  description: 'Trouvez les salons les plus proches de vous'
                },
                {
                  icon: Calendar,
                  title: 'Mode hors-ligne',
                  description: 'Consultez vos rendez-vous même sans connexion'
                },
                {
                  icon: Star,
                  title: 'Programme fidélité',
                  description: 'Cumulez des points et bénéficiez de réductions'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-gray-300 text-sm">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="text-lg font-semibold">Soyez notifié du lancement :</div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-3 bg-black hover:bg-gray-800 px-6 py-3 rounded-xl transition-colors">
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Bientôt sur</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-black hover:bg-gray-800 px-6 py-3 rounded-xl transition-colors">
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Bientôt sur</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Restez informé</h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                  S'inscrire
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-primary-600 h-12 flex items-center justify-between px-6 text-white text-sm">
                    <span>9:41</span>
                    <span>NGUESSBEAUTY</span>
                    <span>100%</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <img 
                        src="/src/assets/nguessbeauty_logo_2.png" 
                        alt="NGUESSBEAUTY" 
                        className="h-12 w-auto mx-auto mb-2"
                      />
                      <h3 className="font-bold text-gray-900">Bienvenue</h3>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Smartphone className="h-5 w-5 text-primary-600" />
                        <span className="font-semibold text-gray-900">Recherche rapide</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-sm text-gray-600">
                        Salon près de moi...
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-primary-50 rounded-xl p-3 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Élégance Coiffure</div>
                          <div className="text-xs text-gray-600">Akwa, Douala</div>
                        </div>
                      </div>
                      
                      <div className="bg-accent-50 rounded-xl p-3 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent-600 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Beauty Palace</div>
                          <div className="text-xs text-gray-600">Bastos, Yaoundé</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-primary-600 text-white p-3 rounded-xl shadow-lg"
              >
                <Bell className="h-5 w-5" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-accent-600 text-white p-3 rounded-xl shadow-lg"
              >
                <Star className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;