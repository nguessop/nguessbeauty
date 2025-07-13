import React, { useState } from 'react';
import { MessageCircle, Clock, User, AlertCircle, CheckCircle, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../Layout/AdminLayout';

const SupportManagement: React.FC = () => {
  const [tickets, setTickets] = useState([
    {
      id: '1',
      ticketNumber: 'TICK-001',
      subject: 'Problème de paiement',
      description: 'Je n\'arrive pas à finaliser mon paiement avec Orange Money',
      user: 'Aminata Diallo',
      userType: 'client',
      priority: 'high',
      status: 'open',
      category: 'payment',
      createdAt: '2025-01-15T10:30:00Z',
      lastReply: '2025-01-15T14:20:00Z',
      assignedTo: 'Support Team'
    },
    {
      id: '2',
      ticketNumber: 'TICK-002',
      subject: 'Demande de validation salon',
      description: 'Mon salon n\'apparaît pas encore sur la plateforme après inscription',
      user: 'Marie Ngono',
      userType: 'provider',
      priority: 'medium',
      status: 'in_progress',
      category: 'account',
      createdAt: '2025-01-14T16:45:00Z',
      lastReply: '2025-01-15T09:15:00Z',
      assignedTo: 'Admin Team'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'in_progress': return 'En cours';
      case 'resolved': return 'Résolu';
      case 'closed': return 'Fermé';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'payment': return 'Paiement';
      case 'account': return 'Compte';
      case 'booking': return 'Réservation';
      case 'technical': return 'Technique';
      case 'other': return 'Autre';
      default: return category;
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Client</h1>
            <p className="text-gray-600">Gérez les tickets de support et demandes d'aide</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              title: 'Tickets Ouverts', 
              value: '23', 
              icon: AlertCircle, 
              color: 'from-red-500 to-red-600' 
            },
            { 
              title: 'En Cours', 
              value: '15', 
              icon: Clock, 
              color: 'from-yellow-500 to-yellow-600' 
            },
            { 
              title: 'Résolus Aujourd\'hui', 
              value: '8', 
              icon: CheckCircle, 
              color: 'from-green-500 to-green-600' 
            },
            { 
              title: 'Temps de Réponse Moyen', 
              value: '2.5h', 
              icon: Clock, 
              color: 'from-blue-500 to-blue-600' 
            }
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
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
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
                placeholder="Rechercher par numéro, sujet, utilisateur..."
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
              <option value="open">Ouverts</option>
              <option value="in_progress">En cours</option>
              <option value="resolved">Résolus</option>
              <option value="closed">Fermés</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtres avancés</span>
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{ticket.ticketNumber}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">{ticket.subject}</h4>
                    <p className="text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{ticket.user} ({ticket.userType === 'client' ? 'Client' : 'Salon'})</span>
                      </div>
                      <span>•</span>
                      <span>{getCategoryText(ticket.category)}</span>
                      <span>•</span>
                      <span>Créé le {formatDate(ticket.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                    {getStatusText(ticket.status)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Assigné à: <span className="font-medium">{ticket.assignedTo}</span>
                  <span className="mx-2">•</span>
                  Dernière réponse: {formatDate(ticket.lastReply)}
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="open">Ouvert</option>
                    <option value="in_progress">En cours</option>
                    <option value="resolved">Résolu</option>
                    <option value="closed">Fermé</option>
                  </select>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Répondre
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SupportManagement;