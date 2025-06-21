import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppChatProps {
  supportNumber?: string;
  businessName?: string;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ 
  supportNumber = "+237699123456", 
  businessName = "NGUESSBEAUTY Support" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const quickMessages = [
    {
      id: 'booking',
      title: 'Réservation',
      message: 'Bonjour, j\'aimerais faire une réservation dans un salon.'
    },
    {
      id: 'cancel',
      title: 'Annulation',
      message: 'Bonjour, j\'aimerais annuler ou modifier ma réservation.'
    },
    {
      id: 'payment',
      title: 'Paiement',
      message: 'Bonjour, j\'ai une question concernant le paiement.'
    },
    {
      id: 'loyalty',
      title: 'Fidélité',
      message: 'Bonjour, j\'ai une question sur mes points de fidélité.'
    },
    {
      id: 'technical',
      title: 'Problème technique',
      message: 'Bonjour, j\'ai un problème technique avec l\'application.'
    },
    {
      id: 'other',
      title: 'Autre',
      message: 'Bonjour, j\'ai une question.'
    }
  ];

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim()) return;

    const encodedMessage = encodeURIComponent(textToSend);
    const whatsappUrl = `https://wa.me/${supportNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setSelectedTopic('');
    setIsOpen(false);
  };

  const handleQuickMessage = (quickMsg: typeof quickMessages[0]) => {
    setSelectedTopic(quickMsg.id);
    setMessage(quickMsg.message);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{businessName}</h3>
                    <div className="flex items-center space-x-1 text-green-100 text-xs">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span>En ligne</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  <p className="text-sm text-gray-700">
                    👋 Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Réponse généralement en quelques minutes</span>
                </div>
              </div>

              {/* Quick Topics */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Sujets fréquents :
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickMessages.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleQuickMessage(topic)}
                      className={`p-2 text-xs rounded-lg border transition-colors text-left ${
                        selectedTopic === topic.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!message.trim()}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Envoyer sur WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>Ou appelez-nous : {supportNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Clock className="h-4 w-4" />
                  <span>Lun-Sam: 8h-19h, Dim: 10h-16h</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppChat;