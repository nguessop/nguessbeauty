import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, TrendingUp, Calendar, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialties: string[];
  rating: number;
  totalAppointments: number;
  monthlyRevenue: number;
  experience: number;
  isActive: boolean;
  joinedAt: string;
  schedule: WeekSchedule;
}

interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

interface DaySchedule {
  isWorking: boolean;
  startTime?: string;
  endTime?: string;
  breakStart?: string;
  breakEnd?: string;
}

const ProviderStaff: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Marie Ngono',
      email: 'marie.ngono@email.com',
      phone: '+237 6XX XXX XXX',
      avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
      specialties: ['Coiffure', 'Défrisage', 'Soins capillaires'],
      rating: 4.9,
      totalAppointments: 156,
      monthlyRevenue: 180000,
      experience: 8,
      isActive: true,
      joinedAt: '2023-01-15',
      schedule: {
        monday: { isWorking: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
        tuesday: { isWorking: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
        wednesday: { isWorking: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
        thursday: { isWorking: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
        friday: { isWorking: true, startTime: '08:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
        saturday: { isWorking: true, startTime: '08:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00' },
        sunday: { isWorking: false }
      }
    },
    {
      id: '2',
      name: 'Grace Mballa',
      email: 'grace.mballa@email.com',
      phone: '+237 6YY YYY YYY',
      avatar: 'https://images.pexels.com/photos/3992644/pexels-photo-3992644.jpeg',
      specialties: ['Tresses', 'Extensions', 'Manucure'],
      rating: 4.7,
      totalAppointments: 98,
      monthlyRevenue: 125000,
      experience: 5,
      isActive: true,
      joinedAt: '2023-06-10',
      schedule: {
        monday: { isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '12:30', breakEnd: '13:30' },
        tuesday: { isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '12:30', breakEnd: '13:30' },
        wednesday: { isWorking: false },
        thursday: { isWorking: true, startTime: '09:00', endTime: '17:00', breakStart: '12:30', breakEnd: '13:30' },
        friday: { isWorking: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
        saturday: { isWorking: true, startTime: '09:00', endTime: '18:00', breakStart: '12:30', breakEnd: '13:30' },
        sunday: { isWorking: true, startTime: '10:00', endTime: '16:00' }
      }
    },
    {
      id: '3',
      name: 'Sandrine Fouda',
      email: 'sandrine.fouda@email.com',
      phone: '+237 6ZZ ZZZ ZZZ',
      avatar: 'https://images.pexels.com/photos/3992660/pexels-photo-3992660.jpeg',
      specialties: ['Maquillage', 'Soins visage', 'Manucure'],
      rating: 4.5,
      totalAppointments: 72,
      monthlyRevenue: 95000,
      experience: 4,
      isActive: true,
      joinedAt: '2023-09-20',
      schedule: {
        monday: { isWorking: true, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
        tuesday: { isWorking: true, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
        wednesday: { isWorking: true, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
        thursday: { isWorking: true, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
        friday: { isWorking: true, startTime: '10:00', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
        saturday: { isWorking: true, startTime: '10:00', endTime: '19:00', breakStart: '13:00', breakEnd: '14:00' },
        sunday: { isWorking: false }
      }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mer',
      thursday: 'Jeu',
      friday: 'Ven',
      saturday: 'Sam',
      sunday: 'Dim'
    };
    return days[day];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Gestion d'équipe</h1>
            <p className="text-secondary-600">Gérez votre personnel et leurs performances</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter un employé</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedView === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grille
                </button>
                <button
                  onClick={() => setSelectedView('list')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedView === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Liste
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="h-4 w-4" />
                <span>Filtrer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Staff Grid/List */}
        {selectedView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary-900">{member.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                        <span className="text-sm text-gray-500">({member.totalAppointments} RDV)</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-secondary-700">
                        CA mensuel: {formatPrice(member.monthlyRevenue)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-secondary-700">
                        {member.experience} ans d'expérience
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Spécialités</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Planning</h4>
                    <div className="grid grid-cols-7 gap-1">
                      {Object.entries(member.schedule).map(([day, schedule]) => (
                        <div
                          key={day}
                          className={`text-center p-1 rounded text-xs ${
                            schedule.isWorking
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {getDayName(day)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Voir détails
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialités</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RDV ce mois</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA mensuel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.slice(0, 2).map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                          {member.specialties.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{member.specialties.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.totalAppointments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatPrice(member.monthlyRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          member.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun employé trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderStaff;