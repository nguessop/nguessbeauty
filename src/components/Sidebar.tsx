import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scissors, 
  Building2, 
  User, 
  Bell,
  Calendar,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/services', icon: Scissors, label: 'Services' },
    { path: '/salons', icon: Building2, label: 'Salons' },
    { path: '/appointments', icon: Calendar, label: 'Rendez-vous' },
    { path: '/clients', icon: Users, label: 'Clients' },
    { path: '/statistics', icon: BarChart3, label: 'Statistiques' },
    { path: '/profile', icon: User, label: 'Profil' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">NB</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              NGUESSBEAUTY
            </h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;