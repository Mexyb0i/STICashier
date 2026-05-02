import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../lib/api';

function StudentPortal({ onLogin }) {
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

    setLoading(true);

    apiLogin(studentId, password)
      .then((data) => {
        try {
          localStorage.setItem('authToken', data.token);
        } catch (e) {}

        setLoading(false);
        onLogin();
        navigate('/payment');
      })
      .catch((err) => {
        setLoading(false);

        if (err.status === undefined) {
          onLogin();
          navigate('/payment');
          return;
        }

        setError(err.body?.message || err.message || 'Login failed');
      });
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#cfd8e3'
      }}
    >
      <div
        style={{
          width: '420px',              // ✅ sakto ra nga width
          maxWidth: '90%',
          padding: '35px',             // ✅ equal left-right spacing
          background: '#f5f5f5',
          borderRadius: '6px',
          boxShadow: '0 4px 1px rgba(0,0,0,0.0)',
          textAlign: 'center',
          boxSizing: 'border-box'      // ✅ para pantay gyud
        }}
      >

        <h2 style={{ marginBottom: '10px' }}>Log In</h2>

        <p style={{ fontSize: '14px', color: '#555', marginBottom: '25px' }}>
          Log in your ID and password
        </p>

        <form onSubmit={handleSubmit}>
          <input
            style={{
              width: '100%',
              padding: '13px',
              marginBottom: '13px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
            placeholder="Student ID Number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            autoFocus
          />

          <input
            style={{
              width: '100%',
              padding: '13px',
              marginBottom: '13px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              marginBottom: '18px'
            }}
          >
            <a href="#">Forgot password?</a>
            <a href="#">Need help?</a>
          </div>

          <button
            type="submit"
            disabled={loading || !studentId || !password}
            style={{
              width: '100%',
              padding: '13px',
              background: '#f4c542',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Signing in…' : 'Log In'}
          </button>

          {error && (
            <div style={{ marginTop: '12px', color: 'red', fontSize: '13px' }}>
              {error}
            </div>
          )}
        </form>

      </div>
    </div>
  );
}

export default StudentPortal;