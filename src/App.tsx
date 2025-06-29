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
import Unauthorized from './pages/Unauthorized';
import { ToastContainer } from 'react-toastify';
import { useTokenExpiration } from './hooks/useTokenExpiration';
import { useInstantNotifications } from './hooks/useInstantNotifications';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';

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
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/salons" element={<SalonSearch />} />
          <Route path="/services" element={<Services />} />
          <Route path="/salon/:id" element={<SalonDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route path="/booking/:salonId" element={
            <ProtectedRoute>
              <BookingFlow />
            </ProtectedRoute>
          } />
          <Route path="/booking-confirmation/:bookingId" element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          } />
          <Route path="/mes-reservations" element={
            <ProtectedRoute requiredRole="client">
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Client-only Routes */}
          <Route path="/portefeuille-fidelite" element={
            <ProtectedRoute requiredRole="client">
              <LoyaltyWallet />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />

      {/* Floating Chat Button */}
      <FloatingChatButton />

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