import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/useAuth';
import LoadingScreen from './components/LoadingScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Salons from './pages/Salons';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Layout from './components/Layout';

const App: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Affichage du loading screen pendant le chargement
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/salons" element={<Salons />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        
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
    </Router>
  );
};

export default App;