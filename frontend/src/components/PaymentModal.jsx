import React, { useState, useEffect } from 'react';

export default function PaymentModal({ open, onClose, onSubmit, maxAmount = 0 }) {
  const [method, setMethod] = useState('Cash');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setAmount(maxAmount ? String(maxAmount) : '');
      setMethod('Cash');
      setNote('');
      setError('');
    }
  }, [open, maxAmount]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const a = parseFloat(String(amount).replace(/,/g, '')) || 0;
    if (a <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (a > maxAmount) {
      setError('Amount exceeds remaining balance');
      return;
    }

    const payment = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      desc: method + (note ? ` — ${note}` : ''),
      amount: a,
    };

    onSubmit(payment);
    onClose();
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="modal" onSubmit={handleSubmit}>
        <h3 style={{ marginTop: 0 }}>Receive Payment</h3>
        <label className="modal-field">
          Method
          <select value={method} onChange={e => setMethod(e.target.value)} className="input">
            <option>Cash</option>
            <option>GCash</option>
            <option>Bank Transfer</option>
          </select>
        </label>

        <label className="modal-field">
          Amount
          <input className="input" value={amount} onChange={e => setAmount(e.target.value)} />
        </label>

        <label className="modal-field">
          Note (optional)
          <input className="input" value={note} onChange={e => setNote(e.target.value)} />
        </label>

        {error && <div className="error" style={{ marginBottom: 8 }}>{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary">Submit Payment</button>
        </div>
      </form>
    </div>
  );
}
