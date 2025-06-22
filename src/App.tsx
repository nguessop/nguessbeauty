import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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

// Provider Pages
import ProviderDashboard from './pages/Provider/Dashboard';
import ProviderServices from './pages/Provider/Services';
import ProviderStaff from './pages/Provider/Staff';
import ProviderAnalytics from './pages/Provider/Analytics';
import ProviderCommunications from './pages/Provider/Communications';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/salons" element={<SalonSearch />} />
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
                <ProtectedRoute>
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

              {/* Provider-only Routes */}
              <Route path="/provider/dashboard" element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderDashboard />
                </ProtectedRoute>
              } />
              <Route path="/provider/services" element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderServices />
                </ProtectedRoute>
              } />
              <Route path="/provider/staff" element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderStaff />
                </ProtectedRoute>
              } />
              <Route path="/provider/analytics" element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/provider/communications" element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderCommunications />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
          
          {/* Floating Chat Button */}
          <FloatingChatButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;