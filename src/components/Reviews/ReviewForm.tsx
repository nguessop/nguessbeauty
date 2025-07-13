import React, { useState } from 'react';
import { Star, Camera, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewFormProps {
    type: 'salon' | 'service';
    targetId: string;
    targetName: string;
    serviceName?: string;
    onSubmit: (review: any) => void;
    onClose: () => void;
    existingBooking?: any;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
                                                   type,
                                                   targetId,
                                                   targetName,
                                                   serviceName,
                                                   onSubmit,
                                                   onClose,
                                                   existingBooking
                                               }) => {
    const [ratings, setRatings] = useState({
        overall: 0,
        quality: 0,
        cleanliness: 0,
        service: 0,
        value: 0,
        punctuality: 0
    });

    const [comment, setComment] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const ratingCategories = {
        salon: [
            { key: 'overall', label: 'Note générale', icon: '⭐' },
            { key: 'quality', label: 'Qualité des services', icon: '💎' },
            { key: 'cleanliness', label: 'Propreté', icon: '🧽' },
            { key: 'service', label: 'Accueil', icon: '🤝' },
            { key: 'value', label: 'Rapport qualité/prix', icon: '💰' }
        ],
        service: [
            { key: 'overall', label: 'Note générale', icon: '⭐' },
            { key: 'quality', label: 'Qualité du service', icon: '💎' },
            { key: 'punctuality', label: 'Ponctualité', icon: '⏰' },
            { key: 'service', label: 'Professionnalisme', icon: '👩‍💼' },
            { key: 'value', label: 'Rapport qualité/prix', icon: '💰' }
        ]
    };

    const currentCategories = ratingCategories[type];

    const handleRatingChange = (category: string, rating: number) => {
        setRatings(prev => ({ ...prev, [category]: rating }));
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (photos.length + files.length <= 5) {
            setPhotos(prev => [...prev, ...files]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const reviewData = {
            type,
            targetId,
            targetName,
            serviceName,
            ratings,
            comment,
            photos,
            isAnonymous,
            bookingId: existingBooking?.id,
            createdAt: new Date().toISOString()
        };

        try {
            await onSubmit(reviewData);
            onClose();
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'avis:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = ratings.overall > 0 && comment.trim().length >= 10;
    const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).filter(r => r > 0).length || 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-secondary-900">
                                Laisser un avis
                            </h2>
                            <p className="text-secondary-600">
                                {type === 'salon' ? `Salon ${targetName}` : `Service: ${serviceName} - ${targetName}`}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center mt-4 space-x-2">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={`flex-1 h-2 rounded-full ${
                                    step <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {/* Step 1: Ratings */}
                    {currentStep === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                                    Comment évaluez-vous votre expérience ?
                                </h3>
                                <p className="text-secondary-600">
                                    Notez chaque aspect de 1 à 5 étoiles
                                </p>
                            </div>

                            <div className="space-y-4">
                                {currentCategories.map((category) => (
                                    <div key={category.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{category.icon}</span>
                                            <span className="font-medium text-secondary-900">
                        {category.label}
                      </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => handleRatingChange(category.key, star)}
                                                    className="p-1 transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`h-6 w-6 ${
                                                            star <= ratings[category.key as keyof typeof ratings]
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {averageRating > 0 && (
                                <div className="text-center p-4 bg-primary-50 rounded-lg">
                                    <div className="text-2xl font-bold text-primary-600">
                                        {averageRating.toFixed(1)}/5
                                    </div>
                                    <p className="text-primary-700">Note moyenne</p>
                                </div>
                            )}

                            <button
                                onClick={() => setCurrentStep(2)}
                                disabled={ratings.overall === 0}
                                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Continuer
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Comment */}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                                    Partagez votre expérience
                                </h3>
                                <p className="text-secondary-600">
                                    Décrivez votre visite en détail (minimum 10 caractères)
                                </p>
                            </div>

                            <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Décrivez votre expérience, ce qui vous a plu ou déplu, des conseils pour d'autres clients..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${comment.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                    {comment.length}/500 caractères
                  </span>
                                    {comment.length >= 10 && (
                                        <span className="text-sm text-green-600 flex items-center">
                      ✓ Commentaire valide
                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    disabled={comment.trim().length < 10}
                                    className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Continuer
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Photos & Submit */}
                    {currentStep === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                                    Ajoutez des photos (optionnel)
                                </h3>
                                <p className="text-secondary-600">
                                    Partagez des photos de votre expérience (max 5 photos)
                                </p>
                            </div>

                            {/* Photo Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                <input
                                    type="file"
                                    id="photo-upload"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                >
                                    <Camera className="h-12 w-12 text-gray-400" />
                                    <span className="text-gray-600">Cliquez pour ajouter des photos</span>
                                    <span className="text-sm text-gray-400">PNG, JPG jusqu'à 5MB chacune</span>
                                </label>
                            </div>

                            {/* Photo Preview */}
                            {photos.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {photos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Photo ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={() => removePhoto(index)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Anonymous Option */}
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="anonymous" className="flex items-center space-x-2 cursor-pointer">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="text-secondary-900">Publier cet avis de manière anonyme</span>
                                </label>
                            </div>

                            {/* Summary */}
                            <div className="bg-primary-50 rounded-lg p-4">
                                <h4 className="font-semibold text-primary-900 mb-2">Résumé de votre avis</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Note générale:</span>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < ratings.overall ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                            <span className="ml-1 font-medium">{ratings.overall}/5</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Commentaire:</span>
                                        <span>{comment.length} caractères</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Photos:</span>
                                        <span>{photos.length} photo(s)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isSubmitting}
                                    className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Publication...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            <span>Publier l'avis</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ReviewForm;