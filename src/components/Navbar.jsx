import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/">
          <span role="img" aria-label="heart">❤️</span> CareMate
        </Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div style={styles.userIcon}>
        <Link to="/login">
          <span role="img" aria-label="user">👤</span>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '1rem' },
  userIcon: { fontSize: '1.5rem' }
};

export default Navbar;