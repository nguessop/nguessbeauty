import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-2xl font-bold">NB</span>
          </div>
        </motion.div>

        {/* Nom de l'entreprise */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          NGUESSBEAUTY
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-600 text-lg mb-8 font-medium"
        >
          Votre beauté, notre passion
        </motion.p>

        {/* Spinner de chargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-12 h-12 border-4 border-pink-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        </motion.div>

        {/* Texte de chargement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-gray-500 mt-4 text-sm"
        >
          Chargement en cours...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;