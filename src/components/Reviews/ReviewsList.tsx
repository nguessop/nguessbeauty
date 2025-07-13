import React, { useState, useEffect } from 'react';
import { Star, Filter, SortAsc, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from './ReviewCard';

interface ReviewsListProps {
    targetId: string;
    targetType: 'salon' | 'service';
    showFilters?: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
                                                     targetId,
                                                     targetType,
                                                     showFilters = true
                                                 }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        rating: 0,
        sortBy: 'recent',
        searchTerm: '',
        verified: false,
        withPhotos: false
    });

    // Mock data - replace with API call
    useEffect(() => {
        const mockReviews = [
            {
                id: '1',
                type: targetType,
                userName: 'Marie Kouam',
                userAvatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
                isAnonymous: false,
                ratings: {
                    overall: 5,
                    quality: 5,
                    cleanliness: 4,
                    service: 5,
                    value: 4,
                    punctuality: 5
                },
                comment: 'Excellente expérience ! Le personnel est très professionnel et accueillant. Mon brushing était parfait et a tenu toute la semaine. Je recommande vivement ce salon, surtout pour les cheveux crépus. L\'ambiance est chaleureuse et les prix sont raisonnables.',
                photos: [
                    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
                    'https://images.pexels.com/photos/3993450/pexels-photo-3993450.jpeg'
                ],
                createdAt: '2024-01-15T10:30:00Z',
                likes: 12,
                dislikes: 0,
                isVerified: true,
                serviceName: 'Brushing + Coiffure',
                response: {
                    text: 'Merci beaucoup Marie pour ce retour positif ! Nous sommes ravis que vous ayez apprécié nos services. À bientôt !',
                    date: '2024-01-16T09:00:00Z',
                    author: 'Salon Belle Époque'
                }
            },
            {
                id: '2',
                type: targetType,
                userName: 'Anonyme',
                isAnonymous: true,
                ratings: {
                    overall: 4,
                    quality: 4,
                    cleanliness: 5,
                    service: 3,
                    value: 4,
                    punctuality: 4
                },
                comment: 'Bon salon dans l\'ensemble. La qualité des soins est correcte mais l\'attente était un peu longue. Le personnel pourrait être plus souriant.',
                photos: [],
                createdAt: '2024-01-10T14:20:00Z',
                likes: 5,
                dislikes: 2,
                isVerified: true,
                serviceName: 'Manucure'
            },
            {
                id: '3',
                type: targetType,
                userName: 'Fatou Diallo',
                userAvatar: 'https://images.pexels.com/photos/4473864/pexels-photo-4473864.jpeg',
                isAnonymous: false,
                ratings: {
                    overall: 3,
                    quality: 3,
                    cleanliness: 4,
                    service: 2,
                    value: 3,
                    punctuality: 2
                },
                comment: 'Expérience mitigée. Le résultat était correct mais j\'ai attendu 45 minutes de plus que prévu. Le salon était propre mais le service client laisse à désirer.',
                photos: ['https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg'],
                createdAt: '2024-01-05T16:45:00Z',
                likes: 3,
                dislikes: 1,
                isVerified: false,
                serviceName: 'Coupe + Coloration'
            }
        ];

        setTimeout(() => {
            setReviews(mockReviews);
            setFilteredReviews(mockReviews);
            setLoading(false);
        }, 1000);
    }, [targetId, targetType]);

    // Apply filters
    useEffect(() => {
        let filtered = [...reviews];

        // Filter by rating
        if (filters.rating > 0) {
            filtered = filtered.filter(review => review.ratings.overall >= filters.rating);
        }

        // Filter by search term
        if (filters.searchTerm) {
            filtered = filtered.filter(review =>
                review.comment.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                review.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                (review.serviceName && review.serviceName.toLowerCase().includes(filters.searchTerm.toLowerCase()))
            );
        }

        // Filter verified only
        if (filters.verified) {
            filtered = filtered.filter(review => review.isVerified);
        }

        // Filter with photos only
        if (filters.withPhotos) {
            filtered = filtered.filter(review => review.photos.length > 0);
        }

        // Sort
        switch (filters.sortBy) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'highest':
                filtered.sort((a, b) => b.ratings.overall - a.ratings.overall);
                break;
            case 'lowest':
                filtered.sort((a, b) => a.ratings.overall - b.ratings.overall);
                break;
            case 'helpful':
                filtered.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
                break;
        }

        setFilteredReviews(filtered);
    }, [reviews, filters]);

    const handleLike = (reviewId: string) => {
        setReviews(prev => prev.map(review =>
            review.id === reviewId
                ? { ...review, likes: review.likes + 1 }
                : review
        ));
    };

    const handleDislike = (reviewId: string) => {
        setReviews(prev => prev.map(review =>
            review.id === reviewId
                ? { ...review, dislikes: review.dislikes + 1 }
                : review
        ));
    };

    const handleReport = (reviewId: string) => {
        // Handle report logic
        console.log('Signaler l\'avis:', reviewId);
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.ratings.overall, 0) / reviews.length
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(review => review.ratings.overall === rating).length,
        percentage: reviews.length > 0
            ? (reviews.filter(review => review.ratings.overall === rating).length / reviews.length) * 100
            : 0
    }));

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                                <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Average Rating */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-secondary-900 mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                        i < Math.round(averageRating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-secondary-600">
                            Basé sur {reviews.length} avis
                        </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map(({ rating, count, percentage }) => (
                            <div key={rating} className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 w-12">
                                    <span className="text-sm text-secondary-600">{rating}</span>
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-secondary-600 w-8">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher dans les avis..."
                                value={filters.searchTerm}
                                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Rating Filter */}
                        <select
                            value={filters.rating}
                            onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value={0}>Toutes les notes</option>
                            <option value={5}>5 étoiles</option>
                            <option value={4}>4+ étoiles</option>
                            <option value={3}>3+ étoiles</option>
                            <option value={2}>2+ étoiles</option>
                            <option value={1}>1+ étoile</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="recent">Plus récents</option>
                            <option value="oldest">Plus anciens</option>
                            <option value="highest">Note la plus élevée</option>
                            <option value="lowest">Note la plus basse</option>
                            <option value="helpful">Plus utiles</option>
                        </select>

                        {/* Additional Filters */}
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={filters.verified}
                                    onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-secondary-700">Vérifiés</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={filters.withPhotos}
                                    onChange={(e) => setFilters(prev => ({ ...prev, withPhotos: e.target.checked }))}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-secondary-700">Avec photos</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onLike={handleLike}
                                onDislike={handleDislike}
                                onReport={handleReport}
                                showServiceName={targetType === 'salon'}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white border border-gray-200 rounded-lg"
                        >
                            <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Aucun avis trouvé
                            </h3>
                            <p className="text-gray-600">
                                {reviews.length === 0
                                    ? 'Soyez le premier à laisser un avis !'
                                    : 'Essayez de modifier vos filtres de recherche.'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {filteredReviews.length > 0 && filteredReviews.length >= 10 && (
                <div className="text-center">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                        Charger plus d'avis
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewsList;