import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MapPin, Bell, User, Heart, LogOut, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationCenter from '../Notifications/NotificationCenter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const { unreadCount } = useNotifications(
    user?.id || '', 
    user?.role || 'client'
  );

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
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
            {isAuthenticated && (
              <Link 
                to="/mes-reservations" 
                className={`font-medium transition-colors ${
                  isActive('/mes-reservations') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Mes Réservations
              </Link>
            )}
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

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Loyalty Wallet (Client only) */}
                {user?.role === 'client' && (
                  <Link 
                    to="/portefeuille-fidelite"
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Wallet className="h-5 w-5" />
                  </Link>
                )}

                {/* Favorites */}
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                      >
                        <Link
                          to="/profil"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Mon profil</span>
                        </Link>
                        {user?.role === 'client' && (
                          <Link
                            to="/portefeuille-fidelite"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Wallet className="h-4 w-4" />
                            <span>Portefeuille fidélité</span>
                          </Link>
                        )}
                        {user?.role === 'provider' && (
                          <Link
                            to="/provider/dashboard"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="h-4 w-4" />
                            <span>Tableau de bord</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}

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
              {isAuthenticated && (
                <Link 
                  to="/mes-reservations" 
                  className={`block py-2 font-medium ${
                    isActive('/mes-reservations') ? 'text-primary-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes Réservations
                </Link>
              )}
              
              {!isAuthenticated && (
                <div className="pt-3 border-t space-y-2">
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
              
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

      {/* Notification Center */}
      {isAuthenticated && (
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          userId={user?.id || ''}
          userType={user?.role || 'client'}
        />
      )}
    </header>
  );
};

export default Header;