import React, { useState } from 'react';
import { MessageCircle, X, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppChat from './WhatsAppChat';
import ChatSupport from './ChatSupport';

const FloatingChatButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleOptionSelect = (option: 'whatsapp' | 'chat') => {
    setShowOptions(false);
    if (option === 'whatsapp') {
      setShowWhatsApp(true);
    } else {
      setShowChat(true);
    }
  };

  return (
    <>
      {/* Main Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-4 w-64"
            >
              <h3 className="font-semibold text-gray-900 mb-3">Comment souhaitez-vous être aidé ?</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleOptionSelect('whatsapp')}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-sm text-gray-600">Chat avec un agent</div>
                  </div>
                </button>

                <button
                  onClick={() => handleOptionSelect('chat')}
                  className="w-full flex items-center space-x-3 p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Assistant virtuel</div>
                    <div className="text-sm text-gray-600">Réponses instantanées</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowOptions(!showOptions)}
          className={`bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-colors ${
            showOptions ? 'rotate-45' : ''
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showOptions ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </motion.div>

      {/* WhatsApp Chat Component */}
      {showWhatsApp && (
        <WhatsAppChat 
          supportNumber="+237699123456"
          businessName="NGUESSBEAUTY Support"
        />
      )}

      {/* Chat Support Component */}
      <ChatSupport 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </>
  );
};

export default FloatingChatButton;