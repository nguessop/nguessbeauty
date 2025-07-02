import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../Layout/AdminLayout';

const CategoriesManagement: React.FC = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Coiffure',
      slug: 'coiffure',
      description: 'Services de coiffure et soins capillaires',
      icon: 'scissors',
      color: '#3B82F6',
      isActive: true,
      servicesCount: 45,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Maquillage',
      slug: 'maquillage',
      description: 'Services de maquillage professionnel',
      icon: 'palette',
      color: '#EC4899',
      isActive: true,
      servicesCount: 23,
      createdAt: '2024-01-15'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingCategory.id) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      ));
    } else {
      setCategories([...categories, { ...editingCategory, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catégories de Services</h1>
            <p className="text-gray-600">Gérez les catégories de services de la plateforme</p>
          </div>
          <button
            onClick={() => {
              setEditingCategory({ name: '', slug: '', description: '', icon: '', color: '#3B82F6', isActive: true });
              setIsEditing(true);
            }}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle catégorie</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon === 'scissors' ? '✂️' : '🎨'}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{category.servicesCount} services</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingCategory.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                  <input
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingCategory.isActive}
                    onChange={(e) => setEditingCategory({...editingCategory, isActive: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">Catégorie active</label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CategoriesManagement;