import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import SalonSearch from './pages/SalonSearch';
import SalonDetails from './pages/SalonDetails';
import BookingFlow from './pages/BookingFlow';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salons" element={<SalonSearch />} />
            <Route path="/salon/:id" element={<SalonDetails />} />
            <Route path="/booking/:salonId" element={<BookingFlow />} />
            <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
            <Route path="/mes-reservations" element={<MyBookings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profil" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;