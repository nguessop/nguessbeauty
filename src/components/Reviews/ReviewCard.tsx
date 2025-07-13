import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, MoreHorizontal, User, Calendar, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
    id: string;
    type: 'salon' | 'service';
    userName: string;
    userAvatar?: string;
    isAnonymous: boolean;
    ratings: {
        overall: number;
        quality: number;
        cleanliness?: number;
        service: number;
        value: number;
        punctuality?: number;
    };
    comment: string;
    photos: string[];
    createdAt: string;
    likes: number;
    dislikes: number;
    isVerified: boolean;
    serviceName?: string;
    response?: {
        text: string;
        date: string;
        author: string;
    };
}

interface ReviewCardProps {
    review: Review;
    onLike?: (reviewId: string) => void;
    onDislike?: (reviewId: string) => void;
    onReport?: (reviewId: string) => void;
    showServiceName?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
                                                   review,
                                                   onLike,
                                                   onDislike,
                                                   onReport,
                                                   showServiceName = false
                                               }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [showFullComment, setShowFullComment] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hier';
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
        return date.toLocaleDateString('fr-FR');
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getRatingLabel = (rating: number) => {
        if (rating >= 4.5) return 'Excellent';
        if (rating >= 4) return 'Très bien';
        if (rating >= 3) return 'Bien';
        if (rating >= 2) return 'Moyen';
        return 'Décevant';
    };

    const visiblePhotos = showAllPhotos ? review.photos : review.photos.slice(0, 3);
    const hasMorePhotos = review.photos.length > 3;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {review.isAnonymous ? (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                        </div>
                    ) : (
                        <img
                            src={review.userAvatar || `https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg`}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-secondary-900">
                                {review.isAnonymous ? 'Utilisateur anonyme' : review.userName}
                            </h4>
                            {review.isVerified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  ✓ Vérifié
                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(review.createdAt)}</span>
                            {showServiceName && review.serviceName && (
                                <>
                                    <span>•</span>
                                    <span className="text-primary-600 font-medium">{review.serviceName}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
            </div>

            {/* Rating */}
            <div className="mb-4">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                    i < review.ratings.overall
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className={`font-semibold ${getRatingColor(review.ratings.overall)}`}>
            {review.ratings.overall}/5
          </span>
                    <span className="text-sm text-secondary-600">
            {getRatingLabel(review.ratings.overall)}
          </span>
                </div>

                {/* Detailed Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {Object.entries(review.ratings).map(([key, value]) => {
                        if (key === 'overall' || value === 0) return null;
                        const labels: Record<string, string> = {
                            quality: 'Qualité',
                            cleanliness: 'Propreté',
                            service: 'Service',
                            value: 'Prix',
                            punctuality: 'Ponctualité'
                        };
                        return (
                            <div key={key} className="flex items-center justify-between text-secondary-600">
                                <span>{labels[key]}:</span>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${
                                                i < value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
                <p className="text-secondary-700 leading-relaxed">
                    {showFullComment || review.comment.length <= 200
                        ? review.comment
                        : `${review.comment.substring(0, 200)}...`}
                </p>
                {review.comment.length > 200 && (
                    <button
                        onClick={() => setShowFullComment(!showFullComment)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1"
                    >
                        {showFullComment ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
            </div>

            {/* Photos */}
            {review.photos.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-3 gap-2">
                        {visiblePhotos.map((photo, index) => (
                            <div
                                key={index}
                                className="relative cursor-pointer group"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-20 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                                    <Camera className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                        {hasMorePhotos && !showAllPhotos && (
                            <button
                                onClick={() => setShowAllPhotos(true)}
                                className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-gray-200 transition-colors"
                            >
                                <div className="text-center">
                                    <span className="text-sm font-medium">+{review.photos.length - 3}</span>
                                    <div className="text-xs">photos</div>
                                </div>
                            </button>
                        )}
                    </div>
                    {showAllPhotos && hasMorePhotos && (
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                        >
                            Voir moins de photos
                        </button>
                    )}
                </div>
            )}

            {/* Salon Response */}
            {review.response && (
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="font-semibold text-primary-900">Réponse du salon</span>
                        <span className="text-sm text-primary-600">{formatDate(review.response.date)}</span>
                    </div>
                    <p className="text-primary-800 text-sm">{review.response.text}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => onLike?.(review.id)}
                        className="flex items-center space-x-2 text-secondary-600 hover:text-green-600 transition-colors"
                    >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{review.likes}</span>
                    </button>
                    <button
                        onClick={() => onDislike?.(review.id)}
                        className="flex items-center space-x-2 text-secondary-600 hover:text-red-600 transition-colors"
                    >
                        <ThumbsDown className="h-4 w-4" />
                        <span className="text-sm">{review.dislikes}</span>
                    </button>
                </div>

                <button
                    onClick={() => onReport?.(review.id)}
                    className="flex items-center space-x-1 text-secondary-400 hover:text-red-600 transition-colors"
                >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm">Signaler</span>
                </button>
            </div>

            {/* Photo Modal */}
            {selectedPhoto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <motion.img
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        src={selectedPhoto}
                        alt="Photo agrandie"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                    >
                        <span className="text-white text-xl">×</span>
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ReviewCard;