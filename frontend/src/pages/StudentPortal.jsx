import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../lib/api';

export default function StudentPortal({ onLogin }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const trimmedId = studentId.trim();
    const trimmedPassword = password.trim();
    const inferredRole = /^\d{4}-\d{4,6}$/.test(trimmedId) ? 'student' : 'admin';

    if (!trimmedId || !trimmedPassword) {
      setError('Please enter your Student ID or Admin username/email and password.');
      return;
    }

    if (inferredRole === 'student' && !/^\d{4}-\d{4,6}$/.test(trimmedId)) {
      setError('Please enter a valid Student ID in the format 2023-2000.');
      return;
    }

    if (inferredRole === 'admin' && trimmedId.length < 3) {
      setError('Please enter a valid admin username or email.');
      return;
    }

    if (trimmedPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    
    apiLogin(trimmedId, trimmedPassword, inferredRole)
      .then(data => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', inferredRole);
        
        const displayName = inferredRole === 'admin' ? 'Administrator' : (data.name || trimmedId);
        localStorage.setItem('studentName', displayName); 
        
        setLoading(false);
        onLogin(); 
        navigate('/dashboard'); 
      })
      .catch((err) => {
        setLoading(false);
        const message = err?.message && err.message !== 'API Error'
          ? err.message
          : 'Invalid credentials. Please check your details and try again.';
        setError(message);
      });
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.loginCard}>
        <div style={styles.headerSection}>
          <div style={styles.brandBadge}>
            <img
              src="https://one.sti.edu/images/sti_logo.png"
              alt="STI Logo"
              style={styles.brandLogo}
            />
          </div>
          <h1 style={styles.title}>STI Cashier Portal</h1>
          <p style={styles.subtitle}>Use your Student ID or Admin username/email to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorAlert}>{error}</div>}

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Student ID or Admin username/email</label>
            <input 
              type="text" 
              placeholder="e.g. 2023-2000 or canoy.2030@sti"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={styles.input}
              required 
            />
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required 
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : 'LOGIN'}
          </button>
          
          <div style={styles.footerLinks}>
            <span style={styles.link}>Forgot Password?</span>
            <span style={styles.link}>Contact Registrar</span>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5', // Light grey background
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  headerSection: {
    marginBottom: '30px',
  },
  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    marginBottom: '10px',
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  brandLogo: {
    width: '120px',
    height: 'auto',
    display: 'block',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    margin: '10px 0 5px 0',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#777',
    margin: 0,
  },
  inputWrapper: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s',
  },
  errorAlert: {
    backgroundColor: '#fff1f0',
    color: '#d9534f',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    marginBottom: '20px',
    border: '1px solid #ffa39e',
  },
  footerLinks: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
  },
  link: {
    color: '#0056b3',
    cursor: 'pointer',
    textDecoration: 'none',
  }
};