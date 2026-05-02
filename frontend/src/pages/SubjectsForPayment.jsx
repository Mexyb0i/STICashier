import React from 'react';

export default function SubjectsForPayment() {
  const enrolled = [
    { code: 'CS101', name: 'Information Management', units: 3, amount: 1500 },
    { code: 'CS102', name: 'Programming II', units: 3, amount: 1500 },
    { code: 'CS103', name: 'Physics', units: 2, amount: 1000 }
  ];

  const total = enrolled.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="page-grid">
      <div className="card list-card">
        <h3>Subjects Enrolled (To Pay)</h3>
        <table className="subjects-table">
          <thead>
            <tr><th>Code</th><th>Subject</th><th>Units</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {enrolled.map(e => (
              <tr key={e.code}><td>{e.code}</td><td>{e.name}</td><td>{e.units}</td><td>₱ {e.amount}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card summary-card">
        <h3>Payment Summary</h3>
        <div className="summary-row"><span>Subtotal</span><span>₱ {total}</span></div>
        <div className="summary-row total"><span>Total to Pay</span><span>₱ {total}</span></div>
        <button className="primary">Proceed to Payment</button>
      </div>
    </div>
  );
}