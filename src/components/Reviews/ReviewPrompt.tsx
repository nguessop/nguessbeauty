import React, { useState } from 'react';
import { Star, MessageCircle, Camera, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewPromptProps {
    booking: {
        id: string;
        salonName: string;
        serviceName: string;
        date: string;
        status: string;
    };
    onReviewClick: () => void;
    onDismiss: () => void;
}

const ReviewPrompt: React.FC<ReviewPromptProps> = ({
                                                       booking,
                                                       onReviewClick,
                                                       onDismiss
                                                   }) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleDismiss = () => {
        setDismissed(true);
        onDismiss();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-lg p-6 mb-6"
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                        Comment s'est passé votre rendez-vous ?
                    </h3>
                    <p className="text-secondary-600 mb-4">
                        Vous avez récemment visité <span className="font-medium text-primary-600">{booking.salonName}</span>
                        {' '}pour un service de <span className="font-medium">{booking.serviceName}</span>.
                        Partagez votre expérience pour aider d'autres clients !
                    </p>

                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                            <MessageCircle className="h-4 w-4" />
                            <span>Partagez votre avis</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                            <Camera className="h-4 w-4" />
                            <span>Ajoutez des photos</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-accent-600">
                            <Gift className="h-4 w-4" />
                            <span>Gagnez 10 points fidélité</span>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onReviewClick}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                        >
                            <Star className="h-4 w-4" />
                            <span>Laisser un avis</span>
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Plus tard
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleDismiss}
                    className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                >
                    <span className="text-gray-400 text-xl">×</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ReviewPrompt;