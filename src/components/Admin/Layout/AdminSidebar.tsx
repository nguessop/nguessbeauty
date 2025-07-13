import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Scissors, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Star, 
  Settings, 
  BarChart3,
  Shield,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MapPin,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isMenuActive = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      single: true
    },
    {
      id: 'users',
      title: 'Gestion des utilisateurs',
      icon: Users,
      children: [
        { title: 'Clients', path: '/admin/users/clients' },
        { title: 'Salons', path: '/admin/users/salons' },
        { title: 'Personnel', path: '/admin/users/staff' }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      icon: Scissors,
      children: [
        { title: 'Catégories', path: '/admin/services/categories' },
        { title: 'Services', path: '/admin/services/list' },
        { title: 'Validation', path: '/admin/services/validation' }
      ]
    },
    {
      id: 'bookings',
      title: 'Réservations',
      icon: Calendar,
      children: [
        { title: 'Toutes les réservations', path: '/admin/bookings/all' },
        { title: 'Planning global', path: '/admin/bookings/planning' },
        { title: 'Conflits', path: '/admin/bookings/conflicts' }
      ]
    },
    {
      id: 'payments',
      title: 'Paiements',
      icon: CreditCard,
      children: [
        { title: 'Transactions', path: '/admin/payments/transactions' },
        { title: 'Commissions', path: '/admin/payments/commissions' },
        { title: 'Reversements', path: '/admin/payments/payouts' }
      ]
    },
    {
      id: 'billing',
      title: 'Facturation',
      icon: FileText,
      children: [
        { title: 'Factures clients', path: '/admin/billing/client-invoices' },
        { title: 'Factures salons', path: '/admin/billing/salon-invoices' },
        { title: 'Configuration TVA', path: '/admin/billing/tax-config' }
      ]
    },
    {
      id: 'content',
      title: 'Contenu & Communication',
      icon: MessageSquare,
      children: [
        { title: 'Pages CMS', path: '/admin/content/cms' },
        { title: 'Newsletters', path: '/admin/content/newsletters' },
        { title: 'Notifications', path: '/admin/content/notifications' },
        { title: 'FAQ', path: '/admin/content/faq' }
      ]
    },
    {
      id: 'reviews',
      title: 'Avis & Modération',
      icon: Star,
      children: [
        { title: 'Avis clients', path: '/admin/reviews/list' },
        { title: 'Modération', path: '/admin/reviews/moderation' },
        { title: 'Signalements', path: '/admin/reviews/reports' }
      ]
    },
    {
      id: 'analytics',
      title: 'Statistiques',
      icon: BarChart3,
      children: [
        { title: 'Vue d\'ensemble', path: '/admin/analytics/overview' },
        { title: 'Revenus', path: '/admin/analytics/revenue' },
        { title: 'Utilisateurs', path: '/admin/analytics/users' },
        { title: 'Performances', path: '/admin/analytics/performance' }
      ]
    },
    {
      id: 'map',
      title: 'Carte des salons',
      icon: MapPin,
      path: '/admin/map',
      single: true
    },
    {
      id: 'support',
      title: 'Support',
      icon: HelpCircle,
      children: [
        { title: 'Tickets', path: '/admin/support/tickets' },
        { title: 'Messages', path: '/admin/support/messages' },
        { title: 'Incidents', path: '/admin/support/incidents' }
      ]
    },
    {
      id: 'security',
      title: 'Sécurité',
      icon: Shield,
      children: [
        { title: 'Permissions', path: '/admin/security/permissions' },
        { title: 'Audit', path: '/admin/security/audit' },
        { title: 'RGPD', path: '/admin/security/gdpr' }
      ]
    },
    {
      id: 'settings',
      title: 'Paramètres',
      icon: Settings,
      children: [
        { title: 'Configuration', path: '/admin/settings/config' },
        { title: 'API', path: '/admin/settings/api' },
        { title: 'Maintenance', path: '/admin/settings/maintenance' }
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-50 overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">NB</span>
          </div>
          <div>
            <Link
                to="/">
            <h2 className="text-lg font-bold text-white">NGUESSBEAUTY</h2>
            </Link>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.single ? (
                <Link
                  to={item.path!}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path!)
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                      isMenuActive(item.children?.map(child => child.path) || [])
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {expandedMenus.includes(item.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedMenus.includes(item.id) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-8 mt-2 space-y-1 overflow-hidden"
                      >
                        {item.children?.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(child.path)
                                  ? 'bg-primary-600 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;