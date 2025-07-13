import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Star, Plus, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewsList from '../components/Reviews/ReviewsList';
import ReviewForm from '../components/Reviews/ReviewForm';

const Reviews: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as 'salon' | 'service' || 'salon';
    const name = searchParams.get('name') || 'Salon de beauté';
    const serviceName = searchParams.get('service');

    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleSubmitReview = async (reviewData: any) => {
        // Here you would typically send the review to your API
        console.log('Nouveau avis:', reviewData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message or update reviews list
        alert('Votre avis a été publié avec succès !');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
                                Avis et évaluations
                            </h1>
                            <p className="text-secondary-600">
                                {type === 'salon' ? `Salon ${name}` : `Service: ${serviceName} - ${name}`}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowReviewForm(true)}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Laisser un avis</span>
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <ReviewsList
                    targetId={id!}
                    targetType={type}
                    showFilters={true}
                />

                {/* Review Form Modal */}
                <AnimatePresence>
                    {showReviewForm && (
                        <ReviewForm
                            type={type}
                            targetId={id!}
                            targetName={name}
                            serviceName={serviceName || undefined}
                            onSubmit={handleSubmitReview}
                            onClose={() => setShowReviewForm(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reviews;