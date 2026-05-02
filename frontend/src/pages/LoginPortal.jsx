import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../lib/api';

export default function StudentPortal({ onLogin }) {
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const input = userInput.trim();
    const pass = password.trim();

    if (!input || !pass) {
      setError('Please enter your ID/Email and password.');
      return;
    }

    // 🔥 AUTO DETECT
    const isStudent = /^\d{4}-\d{4,6}$/.test(input);
    const isCashier = /^[\w.]+@cdo\.sti\.edu\.ph$/.test(input);

    if (!isStudent && !isCashier) {
      setError('Use Student ID or STI Email.');
      return;
    }

    const role = isCashier ? 'cashier' : 'student';

    setLoading(true);

    apiLogin(input, pass, role)
      .then((data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('studentName', data.name || input);

        setLoading(false);
        onLogin();

        // 🔥 ROUTING
        if (role === 'cashier') {
          navigate('/payment');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(() => {
        setLoading(false);
        setError('Invalid credentials.');
      });
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        <div style={styles.logoWrapper}>
          <img
            src="https://one.sti.edu/images/sti_logo.png"
            alt="STI Logo"
            style={styles.logo}
          />
        </div>

        <h2>Payment Portal</h2>
        <p style={styles.subtitle}>Log in your ID or STI email</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Student ID or Email"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eef2f7'
  },
  card: {
    width: '420px',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
    textAlign: 'center'
  },
  logoWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '110px',
    height: '110px',
    borderRadius: '24px',
    background: '#0b3a75',
    margin: '0 auto 20px',
  },
  logo: {
    width: '70px',
    marginBottom: '0'
  },
  subtitle: {
    fontSize: '14px',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#0056b3',
    color: '#fff',
    border: 'none'
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  }
};