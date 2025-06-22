import React, { useState } from 'react';
import { Plus, Edit, Trash2, Clock, DollarSign, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  staffIds: string[];
  isActive: boolean;
  createdAt: string;
}

interface Staff {
  id: string;
  name: string;
  specialties: string[];
}

const ProviderServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Coupe + Brushing',
      description: 'Coupe moderne avec brushing professionnel',
      duration: 90,
      price: 15000,
      category: 'Coiffure',
      staffIds: ['1', '2'],
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Maquillage Soirée',
      description: 'Maquillage professionnel pour événements',
      duration: 90,
      price: 22000,
      category: 'Maquillage',
      staffIds: ['3'],
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Manucure Française',
      description: 'Manucure classique avec vernis français',
      duration: 60,
      price: 8000,
      category: 'Manucure',
      staffIds: ['2', '3'],
      isActive: true,
      createdAt: '2024-01-08'
    }
  ]);

  const [staff] = useState<Staff[]>([
    { id: '1', name: 'Marie Ngono', specialties: ['Coiffure', 'Défrisage'] },
    { id: '2', name: 'Grace Mballa', specialties: ['Tresses', 'Manucure'] },
    { id: '3', name: 'Sandrine Fouda', specialties: ['Maquillage', 'Soins'] }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Coiffure', 'Maquillage', 'Manucure', 'Pédicure', 'Soins', 'Extensions'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: '',
    staffIds: [] as string[]
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const getStaffNames = (staffIds: string[]) => {
    return staff
      .filter(s => staffIds.includes(s.id))
      .map(s => s.name)
      .join(', ');
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
    } else {
      // Create new service
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setServices([...services, newService]);
    }

    setShowModal(false);
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      category: '',
      staffIds: []
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category,
      staffIds: service.staffIds
    });
    setShowModal(true);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const toggleStaff = (staffId: string) => {
    setFormData({
      ...formData,
      staffIds: formData.staffIds.includes(staffId)
        ? formData.staffIds.filter(id => id !== staffId)
        : [...formData.staffIds, staffId]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Catalogue de services</h1>
            <p className="text-secondary-600">Gérez vos services et tarifs</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau service</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-secondary-900 mb-1">{service.name}</h3>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-secondary-600 text-sm mb-4">{service.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-secondary-700">{service.duration} minutes</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-bold text-primary-600">{formatPrice(service.price)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-secondary-700">{getStaffNames(service.staffIds)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun service trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  {editingService ? 'Modifier le service' : 'Nouveau service'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du service *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ex: Coupe + Brushing"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Choisir une catégorie</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Décrivez le service..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Durée (minutes) *
                      </label>
                      <input
                        type="number"
                        required
                        min="15"
                        step="15"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix (FCFA) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Personnel autorisé *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {staff.map(member => (
                        <label
                          key={member.id}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.staffIds.includes(member.id)}
                            onChange={() => toggleStaff(member.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <div>
                            <div className="font-medium text-secondary-900">{member.name}</div>
                            <div className="text-sm text-secondary-600">
                              {member.specialties.join(', ')}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingService(null);
                        setFormData({
                          name: '',
                          description: '',
                          duration: 60,
                          price: 0,
                          category: '',
                          staffIds: []
                        });
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                      {editingService ? 'Modifier' : 'Créer'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderServices;