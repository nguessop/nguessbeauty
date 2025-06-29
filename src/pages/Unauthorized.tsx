import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">
            Accès non autorisé
          </h1>
          
          <p className="text-secondary-600 mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors inline-block"
            >
              Retour à l'accueil
            </Link>
            
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Se connecter avec un autre compte</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;