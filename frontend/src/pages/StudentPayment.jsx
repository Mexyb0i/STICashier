import React, { useState, useMemo } from 'react';
import PaymentModal from '../components/PaymentModal';

function StudentPayment() {
  const [payments, setPayments] = useState([
    { id: 1, date: '1/12/26', desc: 'Entrance Fee', amount: 3000 },
    { id: 2, date: '1/12/26', desc: 'Blouse Uniform', amount: 300 },
    { id: 3, date: '1/12/26', desc: 'ID', amount: 200 },
    { id: 4, date: '1/12/26', desc: 'Skirt Uniform', amount: 250 }
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const tuition = 3000;
  const misc = 200;
  const grandTotal = tuition + misc;

  const totalPaid = useMemo(() => payments.reduce((s, p) => s + Number(p.amount || 0), 0), [payments]);
  const remaining = Math.max(0, grandTotal - totalPaid);

  function handleAddPayment(payment) {
    setPayments(prev => [ ...prev, payment ]);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div className="logo-box">
            <img src="https://one.sti.edu/images/sti_logo.png" alt="STI Logo" className="logo-img" />
          </div>
        </div>

        <div className="page-header-right">
          <div className="filters">
            <div className="filter-item">
              <label className="filter-label">Course</label>
              <select className="input w-180">
                <option>BSIT – Bachelor of Science in Information Technology</option>
                <option>BSTM – Bachelor of Science in Tourism Management</option>
                <option>BSBA – Bachelor of Science in Business Administration</option>
                <option>BSHM – Bachelor of Science in Hospitality Management</option>
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">Year Level</label>
              <select className="input w-80">
                <option>1</option>
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">Semester</label>
              <select className="input w-100">
                <option>1st</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="page-grid">
        <aside className="card info-card">
          <h4 className="card-title">Student Information</h4>
          <div className="info-row">
            <div className="info-left">
              <div className="avatar" />
              <div className="muted">Student ID</div>
              <div className="strong">4079626</div>
            </div>
            <div className="info-right">
              <div className="info-line"><strong>Lastname:</strong> Canoy</div>
              <div className="info-line"><strong>First Name:</strong> Stella Mae</div>
              <div className="info-line"><strong>Middle Name:</strong> Baggao</div>
              <div className="info-line"><strong>Gender:</strong> Female</div>
              <div className="info-line"><strong>Age:</strong> 20</div>
              <div className="info-line"><strong>Contact No:</strong> 0935577010</div>
              <div className="info-line"><strong>Address:</strong> Cagayan de Oro City</div>
            </div>
          </div>

          <div className="card-actions">
            <button className="secondary">Print Receipt</button>
            <button className="primary">Check Subjects</button>
          </div>
        </aside>

        <section className="card balance-section">
          <h4 className="card-title">Balance Details</h4>

          <div className="balance-wrap">
            <div className="balance-left">
              <table className="balance-table">
                <thead>
                  <tr><th>Description</th><th className="right-col">Balance</th></tr>
                </thead>
                <tbody>
                  <tr><td>Total Tuition (Subjects)</td><td className="right-col">₱ {tuition.toLocaleString()}</td></tr>
                  <tr><td>Miscellaneous Fees</td><td className="right-col">₱ {misc.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Actions and totals shown inline below the balance table instead of a floating card */}
            <div className="balance-right-actions">
              <div className="balance-summary">
                <div className="summary-row"><div className="muted">Total Due</div><div className="grand">₱ {grandTotal.toLocaleString()}</div></div>
                <div className="summary-row small muted"><div>Payments</div><div>₱ {totalPaid.toLocaleString()}</div></div>
                <div className="summary-row small"><div className="muted">Remaining</div><div className="grand">₱ {remaining.toLocaleString()}</div></div>
              </div>
              <div style={{ height: 8 }} />
              <div className="balance-actions">
                <button className="secondary" onClick={() => setModalOpen(true)}>Receive Payment</button>
                <button className="primary">Print Receipt</button>
              </div>
            </div>
          </div>

            <div className="history-wrap">
            <h5 className="section-sub">Payment History</h5>
            <table className="subjects-table">
              <thead>
                <tr><th className="col-no">No</th><th className="col-date">Pay Date</th><th>Description</th><th className="col-amount">Amount</th></tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={p.id}><td>{i+1}</td><td>{p.date}</td><td>{p.desc}</td><td className="right-col">₱ {Number(p.amount).toLocaleString()}</td></tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td colSpan={3} className="right-col strong">Total:</td><td className="right-col strong">₱ {totalPaid.toLocaleString()}</td></tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddPayment} maxAmount={remaining} />
    </div>
  );
}
export default StudentPayment;
