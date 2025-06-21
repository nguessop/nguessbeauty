import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface SalonWhatsAppButtonProps {
  salonName: string;
  whatsappNumber: string;
  phoneNumber?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'full';
  message?: string;
}

const SalonWhatsAppButton: React.FC<SalonWhatsAppButtonProps> = ({
  salonName,
  whatsappNumber,
  phoneNumber,
  className = '',
  variant = 'button',
  message
}) => {
  const defaultMessage = message || `Bonjour ${salonName}, j'aimerais prendre rendez-vous.`;
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors ${className}`}
        title={`Contacter ${salonName} sur WhatsApp`}
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>
        {phoneNumber && (
          <button
            onClick={handlePhoneClick}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Appeler</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      <span>WhatsApp</span>
    </button>
  );
};

export default SalonWhatsAppButton;