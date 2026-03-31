import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdEntry() {
  const navigate = useNavigate();

  function viewAccount(e) {
    e.preventDefault();
    navigate('/payment');
  }

  return (
    <div className="center-screen">
      <div className="card id-card">
        <div className="brand">STI</div>
        <h2>Enter Student ID</h2>
        <form onSubmit={viewAccount}>
          <input className="input" placeholder="e.g. 2024-123456" />
          <button className="primary">View Student Account</button>
        </form>
        <p className="muted">Authorized Cashier Access Only • STI Internal System</p>
      </div>
    </div>
  );
}
