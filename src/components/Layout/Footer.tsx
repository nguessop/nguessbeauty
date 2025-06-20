import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/*<img */}
              {/*  src="/src/assets/nguessbeauty_logo_2.png" */}
              {/*  alt="NGUESSBEAUTY" */}
              {/*  className="h-10 w-auto filter brightness-0 invert"*/}
              {/*/>*/}
              <div>
                <h3 className="text-xl font-bold text-primary-400">NGUESSBEAUTY</h3>
                <p className="text-sm text-gray-400">Votre beauté, notre passion</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La première plateforme de réservation pour salons de beauté au Cameroun. 
              Trouvez et réservez facilement vos rendez-vous beauté.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Coiffure</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Maquillage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Manucure & Pédicure</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Soins du visage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Extensions & Tresses</a></li>
            </ul>
          </div>

          {/* Villes */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Nos Villes</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Douala</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Yaoundé</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Bafoussam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Bamenda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Voir toutes les villes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+237 6 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">WhatsApp Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">contact@nguessbeauty.cm</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">Cameroun</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 NGUESSBEAUTY. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;