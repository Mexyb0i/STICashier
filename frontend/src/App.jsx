import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import IdEntry from './pages/IdEntry';
import StudentPortal from './pages/LoginPortal';
import Dashboard from './pages/Dashboard';
import StudentPayment from './pages/StudentPayment';
import SubjectsOverview from './pages/SubjectsOverview';
import SubjectsForPayment from './pages/SubjectsForPayment';
import './styles.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks if the user was already logged in when the page refreshes 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <BrowserRouter>
      {/* The class changes based on login status to keep your dashboard design safe  */}
      <div className={`app-shell ${isLoggedIn ? 'has-sidebar' : 'no-sidebar'}`}>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<IdEntry />} />
            
            {/* Login Route: Passes the handleLogin function  */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <StudentPortal onLogin={handleLogin} />} 
            />

            {/* Protected Routes: Redirects to /login if not authenticated  */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/payment" element={isLoggedIn ? <StudentPayment /> : <Navigate to="/login" />} />
            <Route path="/subjects" element={isLoggedIn ? <SubjectsOverview /> : <Navigate to="/login" />} />
            <Route path="/process" element={isLoggedIn ? <SubjectsForPayment /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}