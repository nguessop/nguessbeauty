import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  Scissors,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Bell,
  Wallet,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  children?: SidebarItem[];
  badge?: number;
}

const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: t('navigation.dashboard'),
      icon: LayoutDashboard,
      path: '/provider/dashboard'
    },
    {
      id: 'appointments',
      label: 'Rendez-vous',
      icon: Calendar,
      children: [
        { id: 'calendar', label: 'Calendrier', icon: Calendar, path: '/provider/calendar' },
        { id: 'bookings', label: 'Réservations', icon: UserCheck, path: '/provider/bookings' }
      ]
    },
    {
      id: 'services',
      label: t('navigation.services'),
      icon: Scissors,
      path: '/provider/services'
    },
    {
      id: 'staff',
      label: t('navigation.staff'),
      icon: Users,
      path: '/provider/staff'
    },
    {
      id: 'analytics',
      label: t('navigation.analytics'),
      icon: BarChart3,
      path: '/provider/analytics'
    },
    {
      id: 'communications',
      label: t('navigation.communications'),
      icon: MessageSquare,
      path: '/provider/communications',
      badge: 3
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      children: [
        { id: 'profile', label: 'Profil salon', icon: Settings, path: '/provider/profile' },
        { id: 'notifications', label: 'Notifications', icon: Bell, path: '/provider/notifications' },
        { id: 'billing', label: 'Facturation', icon: Wallet, path: '/provider/billing' }
      ]
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (children?: SidebarItem[]) => {
    if (!children) return false;
    return children.some(child => isActive(child.path));
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const itemIsActive = isActive(item.path) || isParentActive(item.children);

    return (
      <div key={item.id}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
              itemIsActive
                ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600'
                : 'text-gray-700 hover:bg-gray-100'
            } ${level > 0 ? 'pl-8' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {item.badge}
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <Link
            to={item.path || '#'}
            className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
              itemIsActive
                ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600'
                : 'text-gray-700 hover:bg-gray-100'
            } ${level > 0 ? 'pl-8' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
                {item.badge}
              </span>
            )}
          </Link>
        )}

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/provider/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Scissors className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">NGUESSBEAUTY</h2>
            <p className="text-xs text-gray-500">Pro Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Note moyenne</span>
          </div>
          <div className="text-2xl font-bold">4.8</div>
          <div className="text-xs opacity-90">+0.2 ce mois</div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;