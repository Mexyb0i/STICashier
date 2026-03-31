import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../lib/api';
// Use the official logo from public/sti-official.png for consistency. If missing, element hides.

export default function StudentPortal() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!studentId.trim() || !password.trim()) {
      setError('Please enter both Student ID and Password.');
      return;
    }

    // Call backend API login. If backend is not running, fall back to demo behaviour.
    setLoading(true);
    apiLogin(studentId, password)
      .then(data => {
        // expected response: { token: '...', student: { ... } }
        // Save token temporarily (you'll replace with proper auth/session handling)
        try { localStorage.setItem('authToken', data.token); } catch (e) { /* ignore */ }
        setLoading(false);
        navigate('/payment');
      })
      .catch(err => {
        setLoading(false);
        // If backend unreachable, still allow demo navigation (optional)
        if (err.status === undefined) {
          // network error / dev server not up — fall back to demo
          navigate('/payment');
          return;
        }

        setError(err.body?.message || err.message || 'Login failed');
      });
  }

  return (
    <div className="center-screen">
      <div className="card id-card">
        <div className="brand-box small" role="img" aria-label="STI">
          <span className="brand-box-text">STI</span>
        </div>
        <h2>Student Portal</h2>
        <p className="subtitle">Sign in to view balances, subjects, and process payments.</p>

        <form className="form-grid" onSubmit={handleSubmit} aria-label="Student Portal Login">
          <input
            className="input"
            placeholder="Student ID Number"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            aria-label="Student ID Number"
            autoFocus
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="Password"
          />

          <div className="help-row">
            <a className="link-muted" href="#">Forgot password?</a>
            <a className="link-muted" href="#">Need help?</a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
            <button className="primary" type="submit" disabled={loading || !studentId || !password}>
              {loading ? 'Signing in…' : 'Log In'}
            </button>
          </div>

          {error && <div role="alert" className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
