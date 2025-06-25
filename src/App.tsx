import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { useInstantNotifications } from './hooks/useInstantNotifications';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProviderLayout from './components/Layout/ProviderLayout';
import FloatingChatButton from './components/Chat/FloatingChatButton';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
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

// Import i18n
import './i18n';

// Import Toastify CSS
import 'react-toastify/dist/ReactToastify.css';

// Notification Hook Component
const NotificationHandler: React.FC = () => {
  useInstantNotifications();
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <NotificationHandler />
          
          <Routes>
            {/* Public Routes with Header/Footer */}
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Home />
                </main>
                <Footer />
                <FloatingChatButton />
              </>
            } />
            
            <Route path="/services" element={
              <>
                <Header />
                <main>
                  <Services />
                </main>
                <Footer />
                <FloatingChatButton />
              </>
            } />
            
            <Route path="/salons" element={
              <>
                <Header />
                <main>
                  <SalonSearch />
                </main>
                <Footer />
                <FloatingChatButton />
              </>
            } />
            
            <Route path="/salon/:id" element={
              <>
                <Header />
                <main>
                  <SalonDetails />
                </main>
                <Footer />
                <FloatingChatButton />
              </>
            } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Client Routes */}
            <Route path="/booking/:salonId" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <BookingFlow />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/booking-confirmation/:bookingId" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <BookingConfirmation />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/mes-reservations" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <MyBookings />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Notifications />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/profil" element={
              <ProtectedRoute>
                <Header />
                <main>
                  <Profile />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            {/* Client-only Routes */}
            <Route path="/portefeuille-fidelite" element={
              <ProtectedRoute requiredRole="client">
                <Header />
                <main>
                  <LoyaltyWallet />
                </main>
                <Footer />
              </ProtectedRoute>
            } />

            {/* Provider Routes with Admin Layout */}
            <Route path="/provider" element={
              <ProviderLayout />
            }>
              <Route path="dashboard" element={<ProviderDashboard />} />
              <Route path="services" element={<ProviderServices />} />
              <Route path="staff" element={<ProviderStaff />} />
              <Route path="analytics" element={<ProviderAnalytics />} />
              <Route path="communications" element={<ProviderCommunications />} />
            </Route>
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
            className="z-50"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;