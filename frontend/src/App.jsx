import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentPortal from './pages/StudentPortal';
import StudentPayment from './pages/StudentPayment';
import logo from './assets/sti-logo.png';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="shell">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand-wrap">
              <img className="logo-img" src={logo} alt="STI logo" />
              <div className="brand-title">
                <span className="brand-text">STI Cashier</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<StudentPortal onLogin={() => setLoggedIn(true)} />}
            />
            <Route
              path="/payment"
              element={loggedIn ? <StudentPayment /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;