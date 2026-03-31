import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import IdEntry from './pages/IdEntry';
import StudentPortal from './pages/StudentPortal';
import StudentPayment from './pages/StudentPayment';
import SubjectsOverview from './pages/SubjectsOverview';
import SubjectsForPayment from './pages/SubjectsForPayment';
import './styles.css';
// Using the official logo served from public/sti-official.png. If it's missing, the brand text remains visible.

export default function App() {
  return (
    <BrowserRouter>
      <div className="app shell">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand-wrap">
              {/* Try serving the official image from /sti-official.png (place it in frontend/public/) */}
              <div className="brand-title">
                <div className="brand-box" role="img" aria-label="STI">
                  <span className="brand-box-text">STI</span>
                </div>
                <span className="brand-text">Cashier</span>
              </div>
            </div>
            <nav className="nav">
              <Link to="/">ID</Link>
              <Link to="/login">Portal</Link>
              <Link to="/payment">Payment</Link>
              <Link to="/subjects">Subjects</Link>
              <Link to="/process">Process</Link>
            </nav>
          </div>
        </header>

        <main className="content">
          <div className="page-surface">
            <Routes>
              <Route path="/" element={<IdEntry />} />
              <Route path="/login" element={<StudentPortal />} />
              <Route path="/payment" element={<StudentPayment />} />
              <Route path="/subjects" element={<SubjectsOverview />} />
              <Route path="/process" element={<SubjectsForPayment />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
