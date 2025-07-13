import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Services from './pages/Services';
import Home from './pages/Home';
import SalonSearch from './pages/SalonSearch';
import SalonDetails from './pages/SalonDetails';
import BookingFlow from './pages/BookingFlow';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import LoyaltyWallet from './pages/Client/LoyaltyWallet';
import AdminDashboard from './pages/Admin/Dashboard';
import ClientsManagement from './components/Admin/Users/ClientsManagement';
import SalonsManagement from './components/Admin/Users/SalonsManagement';
import CategoriesManagement from './components/Admin/Services/CategoriesManagement';
import ServicesList from './components/Admin/Services/ServicesList';
import BookingsManagement from './components/Admin/Bookings/BookingsManagement';
import PaymentsManagement from './components/Admin/Payments/PaymentsManagement';
import ReviewsManagement from './components/Admin/Reviews/ReviewsManagement';
import AnalyticsOverview from './components/Admin/Analytics/AnalyticsOverview';
import SupportManagement from './components/Admin/Support/SupportManagement';
import SettingsManagement from './components/Admin/Settings/SettingsManagement';
import SalonMap from './components/Admin/SalonMap';
import Unauthorized from './pages/Unauthorized';
import { ToastContainer } from 'react-toastify';
import { useTokenExpiration } from './hooks/useTokenExpiration';
import { useInstantNotifications } from './hooks/useInstantNotifications';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import ServicesResults from "./pages/services/ServicesResults.tsx";
import Reviews from './pages/Reviews';

function AppContent() {
  // Gérer l'expiration des tokens avec déconnexion intelligente
  useTokenExpiration({
    checkInterval: 30000, // Vérifier toutes les 30 secondes
    inactivityTimeout: 15 * 60 * 1000, // 15 minutes d'inactivité
    warningTime: 5 * 60 * 1000 // Avertir 5 minutes avant expiration
  });

  // Gérer les notifications instantanées
  useInstantNotifications();

  return (
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
              <FloatingChatButton />
            </>
          } />
          <Route path="/salons" element={
            <>
              <Header />
              <SalonSearch />
              <Footer />
              <FloatingChatButton />
            </>
          } />
          <Route path="/services_results" element={
            <>
              <Header />
              <ServicesResults />
              <Footer />
              <FloatingChatButton />
            </>
          } />

          <Route path="/services" element={
            <>
              <Header />
              <Services />
              <Footer />
              <FloatingChatButton />
            </>
          } />

          <Route path="/salon/:id" element={
            <>
              <Header />
              <SalonDetails />
              <Footer />
              <FloatingChatButton />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/avis/:id" element={<Reviews />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route path="/booking/:salonId" element={
            <ProtectedRoute>
              <Header />
              <BookingFlow />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/booking-confirmation/:bookingId" element={
            <ProtectedRoute>
              <Header />
              <BookingConfirmation />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/mes-reservations" element={
            <ProtectedRoute requiredRole="client">
              <Header />
              <MyBookings />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Header />
              <Notifications />
              <Footer />
            </ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute>
              <Header />
              <Profile />
              <Footer />
            </ProtectedRoute>
          } />

          {/* Client-only Routes */}
          <Route path="/portefeuille-fidelite" element={
            <ProtectedRoute requiredRole="client">
              <Header />
              <LoyaltyWallet />
              <Footer />
            </ProtectedRoute>
          } />

          {/* Admin-only Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Users Management */}
          <Route path="/admin/users/clients" element={
            <ProtectedRoute requiredRole="admin">
              <ClientsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/salons" element={
            <ProtectedRoute requiredRole="admin">
              <SalonsManagement />
            </ProtectedRoute>
          } />

          {/* Services Management */}
          <Route path="/admin/services/categories" element={
            <ProtectedRoute requiredRole="admin">
              <CategoriesManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/services/list" element={
            <ProtectedRoute requiredRole="admin">
              <ServicesList />
            </ProtectedRoute>
          } />
          <Route path="/admin/services/validation" element={
            <ProtectedRoute requiredRole="admin">
              <ServicesList />
            </ProtectedRoute>
          } />

          {/* Bookings Management */}
          <Route path="/admin/bookings/all" element={
            <ProtectedRoute requiredRole="admin">
              <BookingsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings/planning" element={
            <ProtectedRoute requiredRole="admin">
              <BookingsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings/conflicts" element={
            <ProtectedRoute requiredRole="admin">
              <BookingsManagement />
            </ProtectedRoute>
          } />

          {/* Payments Management */}
          <Route path="/admin/payments/transactions" element={
            <ProtectedRoute requiredRole="admin">
              <PaymentsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/payments/commissions" element={
            <ProtectedRoute requiredRole="admin">
              <PaymentsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/payments/payouts" element={
            <ProtectedRoute requiredRole="admin">
              <PaymentsManagement />
            </ProtectedRoute>
          } />

          {/* Reviews Management */}
          <Route path="/admin/reviews/list" element={
            <ProtectedRoute requiredRole="admin">
              <ReviewsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/reviews/moderation" element={
            <ProtectedRoute requiredRole="admin">
              <ReviewsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/reviews/reports" element={
            <ProtectedRoute requiredRole="admin">
              <ReviewsManagement />
            </ProtectedRoute>
          } />

          {/* Analytics */}
          <Route path="/admin/analytics/overview" element={
            <ProtectedRoute requiredRole="admin">
              <AnalyticsOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics/revenue" element={
            <ProtectedRoute requiredRole="admin">
              <AnalyticsOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics/users" element={
            <ProtectedRoute requiredRole="admin">
              <AnalyticsOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics/performance" element={
            <ProtectedRoute requiredRole="admin">
              <AnalyticsOverview />
            </ProtectedRoute>
          } />

          {/* Map */}
          <Route path="/admin/map" element={
            <ProtectedRoute requiredRole="admin">
              <SalonMap />
            </ProtectedRoute>
          } />

          {/* Support */}
          <Route path="/admin/support/tickets" element={
            <ProtectedRoute requiredRole="admin">
              <SupportManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/support/messages" element={
            <ProtectedRoute requiredRole="admin">
              <SupportManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/support/incidents" element={
            <ProtectedRoute requiredRole="admin">
              <SupportManagement />
            </ProtectedRoute>
          } />

          {/* Settings */}
          <Route path="/admin/settings/config" element={
            <ProtectedRoute requiredRole="admin">
              <SettingsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings/api" element={
            <ProtectedRoute requiredRole="admin">
              <SettingsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings/maintenance" element={
            <ProtectedRoute requiredRole="admin">
              <SettingsManagement />
            </ProtectedRoute>
          } />
        </Routes>

        {/* Toast Container */}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </div>
  );
}

function App() {
  return (
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
  );
}

export default App;