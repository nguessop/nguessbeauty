import React, { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RatingButtonProps {
    targetId: string;
    targetType: 'salon' | 'service';
    targetName: string;
    serviceName?: string;
    currentRating?: number;
    onRatingSubmit?: (rating: number, comment?: string) => void;
    className?: string;
    variant?: 'button' | 'icon' | 'full';
}

const RatingButton: React.FC<RatingButtonProps> = ({
                                                       targetId,
                                                       targetType,
                                                       targetName,
                                                       serviceName,
                                                       currentRating = 0,
                                                       onRatingSubmit,
                                                       className = '',
                                                       variant = 'button',
                                                   }) => {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitRating = async () => {
        if (selectedRating === 0) return;

        setIsSubmitting(true);
        try {
            await onRatingSubmit?.(selectedRating, comment);
            setShowRatingModal(false);
            setSelectedRating(0);
            setComment('');
        } catch (error) {
            console.error('Erreur lors de la soumission de la note:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRatingText = (rating: number) => {
        if (rating >= 5) return 'Excellent';
        if (rating >= 4) return 'Très bien';
        if (rating >= 3) return 'Bien';
        if (rating >= 2) return 'Moyen';
        if (rating >= 1) return 'Décevant';
        return '';
    };

    const RatingModal = () => (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={(e) => e.target === e.currentTarget && setShowRatingModal(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-md w-full p-6"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Noter {targetType === 'salon' ? targetName : `${serviceName} - ${targetName}`}
                    </h3>

                    {/* Rating Stars */}
                    <div className="mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setSelectedRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-1 transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-8 w-8 ${
                                            star <= (hoverRating || selectedRating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {(hoverRating || selectedRating) > 0 && (
                            <p className="text-center text-sm text-gray-600">
                                {getRatingText(hoverRating || selectedRating)}
                            </p>
                        )}
                    </div>

                    {/* Comment */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Commentaire (optionnel)
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Partagez votre expérience..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            rows={3}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowRatingModal(false)}
                            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSubmitRating}
                            disabled={selectedRating === 0 || isSubmitting}
                            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Envoi...</span>
                                </>
                            ) : (
                                <>
                                    <Star className="h-4 w-4" />
                                    <span>Noter</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    if (variant === 'icon') {
        return (
            <>
                <button
                    onClick={() => setShowRatingModal(true)}
                    className={`p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-colors ${className}`}
                    title={`Noter ${targetType === 'salon' ? 'le salon' : 'le service'}`}
                >
                    <Star className="h-5 w-5" />
                </button>
                {showRatingModal && <RatingModal />}
            </>
        );
    }

    if (variant === 'full') {
        return (
            <>
                <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">
                            Noter {targetType === 'salon' ? 'ce salon' : 'ce service'}
                        </h4>
                        {currentRating > 0 && (
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{currentRating}/5</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowRatingModal(true)}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                        <Star className="h-4 w-4" />
                        <span>{currentRating > 0 ? 'Modifier ma note' : 'Laisser une note'}</span>
                    </button>
                </div>
                {showRatingModal && <RatingModal />}
            </>
        );
    }

    // Default button variant
    return (
        <>
            <button
                onClick={() => setShowRatingModal(true)}
                className={`flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${className}`}
            >
                <Star className="h-4 w-4" />
                <span>{currentRating > 0 ? 'Modifier ma note' : 'Noter'}</span>
            </button>
            {showRatingModal && <RatingModal />}
        </>
    );
};

export default RatingButton;
