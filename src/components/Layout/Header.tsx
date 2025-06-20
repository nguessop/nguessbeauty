import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MapPin, Bell, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {/*<img*/}
            {/*  src="/src/assets/nguessbeauty_logo_2.png"*/}
            {/*  alt="NGUESSBEAUTY"*/}
            {/*  className="h-40 w-auto"*/}
            {/*/>*/}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-600">NGUESSBEAUTY</h1>
              <p className="text-xs text-gray-500">Votre beauté, notre passion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Accueil
            </Link>
            <Link 
              to="/salons" 
              className={`font-medium transition-colors ${
                isActive('/salons') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Salons
            </Link>
            <Link 
              to="/mes-reservations" 
              className={`font-medium transition-colors ${
                isActive('/mes-reservations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Mes Réservations
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Douala</span>
            </div>

            {/* Notifications */}
            <Link 
              to="/notifications"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Favorites */}
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Heart className="h-5 w-5" />
            </button>

            {/* Profile */}
            <Link 
              to="/profil"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pb-4 overflow-hidden"
            >
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un salon, service..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Douala</option>
                  <option>Yaoundé</option>
                  <option>Bafoussam</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-3">
              <Link 
                to="/" 
                className={`block py-2 font-medium ${
                  isActive('/') ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/salons" 
                className={`block py-2 font-medium ${
                  isActive('/salons') ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Salons
              </Link>
              <Link 
                to="/mes-reservations" 
                className={`block py-2 font-medium ${
                  isActive('/mes-reservations') ? 'text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mes Réservations
              </Link>
              <div className="pt-3 border-t">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Localisation: Douala</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;