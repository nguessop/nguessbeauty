import React, { useState } from 'react';
import { Star, Search, Filter, Eye, Check, X, Flag, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../Layout/AdminLayout';

const ReviewsManagement: React.FC = () => {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      client: 'Aminata Diallo',
      salon: 'Élégance Coiffure',
      service: 'Coupe + Brushing',
      rating: 5,
      title: 'Excellent service !',
      comment: 'Très satisfaite de ma coupe, la coiffeuse était très professionnelle et à l\'écoute.',
      date: '2025-01-15',
      status: 'published',
      isReported: false,
      reportCount: 0,
      helpfulCount: 12
    },
    {
      id: '2',
      client: 'Grace Mballa',
      salon: 'Beauty Palace',
      service: 'Maquillage Soirée',
      rating: 4,
      title: 'Bon maquillage',
      comment: 'Le maquillage était bien réalisé, mais l\'attente a été un peu longue.',
      date: '2025-01-14',
      status: 'pending',
      isReported: true,
      reportCount: 2,
      helpfulCount: 5
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hidden': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publié';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      case 'hidden': return 'Masqué';
      default: return status;
    }
  };

  const handleApprove = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'published' } : review
    ));
  };

  const handleReject = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'rejected' } : review
    ));
  };

  const handleHide = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'hidden' } : review
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Avis</h1>
            <p className="text-gray-600">Modérez les avis clients et gérez les signalements</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Total Avis', value: '2,456', change: '+15%', color: 'blue' },
            { title: 'En Attente', value: '23', change: '+5%', color: 'yellow' },
            { title: 'Signalés', value: '8', change: '-12%', color: 'red' },
            { title: 'Note Moyenne', value: '4.6/5', change: '+0.2', color: 'green' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} ce mois
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par client, salon, commentaire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">Publiés</option>
              <option value="pending">En attente</option>
              <option value="rejected">Rejetés</option>
              <option value="hidden">Masqués</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Toutes les notes</option>
              <option value="5">5 étoiles</option>
              <option value="4">4 étoiles</option>
              <option value="3">3 étoiles</option>
              <option value="2">2 étoiles</option>
              <option value="1">1 étoile</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtres avancés</span>
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {review.client.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{review.client}</h3>
                      {review.isReported && (
                        <Flag className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{review.salon}</span>
                      <span>•</span>
                      <span>{review.service}</span>
                      <span>•</span>
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                    {getStatusText(review.status)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm font-medium text-gray-700">{review.rating}/5</span>
                </div>
                {review.title && (
                  <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                )}
                <p className="text-gray-700">{review.comment}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{review.helpfulCount} utiles</span>
                  </div>
                  {review.isReported && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <Flag className="h-4 w-4" />
                      <span>{review.reportCount} signalement{review.reportCount > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  {review.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(review.id)}
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleReject(review.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {review.status === 'published' && (
                    <button 
                      onClick={() => handleHide(review.id)}
                      className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsManagement;