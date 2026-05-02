import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const storedName = localStorage.getItem('studentName');
    if (storedName) setUserName(storedName);
  }, []);

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div style={styles.wrapper}>

      {/* 🔵 LEFT SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <h2 style={{ color: "#fff", margin: 0 }}>Dashboard</h2>
        </div>

        <div style={styles.sidebarBottom}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT (WALA GIUSAB, GI-SIBOG LANG) */}
      <div style={styles.container}> 
        <header style={styles.header}>
          <h1>Welcome, {userName}</h1>
          <p style={{ fontSize: "12px" }}>Student Portal</p>
        </header>

        <div style={styles.summaryGrid}>
          <div style={styles.card}>Total Tuition<br /><b>₱36,734</b></div>
          <div style={styles.card}>Promissory<br /><b>₱12,800</b></div>
          <div style={styles.card}>Misc Fees<br /><b>₱3,575</b></div>
          <div style={styles.card}>Balance<br /><b>₱16,375</b></div>
        </div>

        <div style={styles.section}>
          <h3>Payment Schedule</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Downpayment</td><td>Aug 15</td><td>₱5,000</td><td>Paid</td></tr>
              <tr><td>Prelims</td><td>Sep 20</td><td>₱3,200</td><td>Paid</td></tr>
              <tr><td>Midterms</td><td>Oct 25</td><td>₱3,200</td><td>Pending</td></tr>
              <tr><td>Finals</td><td>Dec 15</td><td>₱3,200</td><td>Pending</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 🔥 STYLES */
const styles = {

 wrapper: {
  display: "flex",
  height: "100vh",
  margin: 0,
  padding: 0,
  overflow: "hidden"
},

  /* 🔵 SIDEBAR */
  sidebar: {
    width: "180px",   // 🔥 dili dako
    background: "#0b5ed7",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 10px"
  },

  sidebarTop: {
    textAlign: "center"
  },

  sidebarBottom: {
    textAlign: "center"
  },

  logoutBtn: {
    background: "#ffd54a",
    border: "none",
    padding: "10px",
    width: "90%",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  /* 🔥 MAIN CONTENT (GI-SIBOG RA) */
  container: {
    flex: 1,
    padding: "20px",
    background: "#f4f7f6",
    overflow: "hidden"
  },

  header: {
    marginBottom: "10px"
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "10px"
  },

  card: {
    background: "#fff",
    padding: "10px",
    borderRadius: "8px"
  },

  section: {
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    height: "100%",
    overflow: "hidden"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};