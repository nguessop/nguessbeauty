import React, { useState, useEffect } from 'react';
import { Gift, TrendingUp, Calendar, Star, Award, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { loyaltyService } from '../../services/loyaltyService';
import { LoyaltyTransaction, Promotion } from '../../types/auth';

const LoyaltyWallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loyaltyLevel, setLoyaltyLevel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLoyaltyData = async () => {
      try {
        const [points, history, promos, level] = await Promise.all([
          loyaltyService.getLoyaltyPoints(),
          loyaltyService.getLoyaltyHistory(),
          loyaltyService.getAvailablePromotions(),
          loyaltyService.getLoyaltyLevel()
        ]);

        setLoyaltyPoints(points);
        setTransactions(history);
        setPromotions(promos);
        setLoyaltyLevel(level);
      } catch (error) {
        console.error('Error loading loyalty data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLoyaltyData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleRedeemPromotion = async (promotionId: string) => {
    try {
      await loyaltyService.redeemPromotion(promotionId);
      // Refresh data
      const [points, promos] = await Promise.all([
        loyaltyService.getLoyaltyPoints(),
        loyaltyService.getAvailablePromotions()
      ]);
      setLoyaltyPoints(points);
      setPromotions(promos);
    } catch (error) {
      console.error('Error redeeming promotion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Mon Portefeuille Fidélité
          </h1>
          <p className="text-secondary-600">
            Gérez vos points, découvrez vos avantages et suivez votre historique
          </p>
        </div>

        {/* Points Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vos Points Fidélité</h2>
              <div className="text-4xl font-bold mb-4">{loyaltyPoints} points</div>
              {loyaltyLevel && (
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">Niveau {loyaltyLevel.level}</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <Gift className="h-16 w-16 text-primary-200 mb-2" />
              {loyaltyLevel && (
                <div className="text-sm text-primary-100">
                  {loyaltyLevel.nextLevelPoints - loyaltyLevel.currentPoints} points pour le niveau suivant
                </div>
              )}
            </div>
          </div>

          {loyaltyLevel && (
            <div className="mt-4">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${(loyaltyLevel.currentPoints / loyaltyLevel.nextLevelPoints) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
                { id: 'history', label: 'Historique', icon: Calendar },
                { id: 'promotions', label: 'Promotions', icon: Gift }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.points, 0)}
                        </div>
                        <div className="text-sm text-green-700">Points gagnés</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Gift className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {transactions.filter(t => t.type === 'redeemed').reduce((sum, t) => sum + t.points, 0)}
                        </div>
                        <div className="text-sm text-blue-700">Points utilisés</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {promotions.filter(p => p.isActive).length}
                        </div>
                        <div className="text-sm text-purple-700">Offres disponibles</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level Benefits */}
                {loyaltyLevel && (
                  <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                      Avantages de votre niveau {loyaltyLevel.level}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {loyaltyLevel.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-secondary-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Transactions récentes
                  </h3>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'earned' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'earned' ? '+' : '-'}
                          </div>
                          <div>
                            <div className="font-medium text-secondary-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-secondary-600">
                              {formatDate(transaction.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className={`font-bold ${
                          transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Historique complet des transactions
                </h3>
                
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            transaction.type === 'earned' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'earned' ? (
                              <TrendingUp className="h-6 w-6" />
                            ) : (
                              <Gift className="h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-secondary-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-secondary-600">
                              {formatDate(transaction.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                          </div>
                          <div className="text-sm text-secondary-500">
                            {transaction.type === 'earned' ? 'Gagné' : 'Utilisé'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune transaction
                    </h3>
                    <p className="text-gray-600">
                      Vos transactions de points apparaîtront ici
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Promotions Tab */}
            {activeTab === 'promotions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-secondary-900">
                  Promotions disponibles
                </h3>

                {promotions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {promotions.map((promotion) => (
                      <div key={promotion.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {promotion.image && (
                          <img
                            src={promotion.image}
                            alt={promotion.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-secondary-900 text-lg">
                              {promotion.title}
                            </h4>
                            <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
                              {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` :
                               promotion.discountType === 'fixed' ? `${promotion.discountValue} FCFA` :
                               `${promotion.discountValue} pts`}
                            </span>
                          </div>
                          
                          <p className="text-secondary-600 mb-4">
                            {promotion.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Valide jusqu'au {formatDate(promotion.validTo)}</span>
                            </div>
                            {promotion.minPoints && (
                              <span>{promotion.minPoints} pts requis</span>
                            )}
                          </div>

                          <button
                            onClick={() => handleRedeemPromotion(promotion.id)}
                            disabled={promotion.minPoints ? loyaltyPoints < promotion.minPoints : false}
                            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                              promotion.minPoints && loyaltyPoints < promotion.minPoints
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 hover:bg-primary-700 text-white'
                            }`}
                          >
                            <Gift className="h-4 w-4" />
                            <span>
                              {promotion.minPoints && loyaltyPoints < promotion.minPoints
                                ? 'Points insuffisants'
                                : 'Utiliser cette offre'
                              }
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune promotion disponible
                    </h3>
                    <p className="text-gray-600">
                      De nouvelles offres seront bientôt disponibles
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyWallet;