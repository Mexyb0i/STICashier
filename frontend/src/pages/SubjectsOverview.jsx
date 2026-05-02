import React from 'react';

export default function SubjectsOverview() {
  const passed = ['Data Structures', 'Programming I', 'Math'];
  const upcoming = ['Information Management', 'Database Systems', 'Networking'];

  return (
    <div className="page-grid">
      <div className="card small-list">
        <h3>Passed Subjects</h3>
        <ul>
          {passed.map((s,i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="card small-list">
        <h3>Upcoming Subjects / To Pay</h3>
        <ul>
          {upcoming.map((s,i) => <li key={i}>{s}</li>)}
        </ul>
        <div className="actions">
          <button className="primary">View Fees & Payment</button>
        </div>
      </div>
    </div>
  );
}