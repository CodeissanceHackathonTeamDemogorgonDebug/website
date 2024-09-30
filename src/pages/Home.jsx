import React from 'react';
import Navbar from '../components/Navbar';


const Home= () => {
  return (
    <div>
      <Navbar/>
      <header style={styles.header}>
        <h1>Care that Connects</h1>
        <p>Empowering seniors with compassionate care and cutting-edge technology.</p>
        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton}>Get Started</button>
          <button style={styles.secondaryButton}>Learn More</button>
        </div>
      </header>

      <section style={styles.featuresSection}>
        <h2>Why Choose CareMate?</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <span role="img" aria-label="heart">❤️</span>
            <h3>Compassionate Care</h3>
            <p>Our caregivers are trained to provide empathetic and personalized care.</p>
          </div>
          <div style={styles.card}>
            <span role="img" aria-label="network">👥</span>
            <h3>Trusted Network</h3>
            <p>Access a vetted network of professional caregivers in your area.</p>
          </div>
          <div style={styles.card}>
            <span role="img" aria-label="reminder">🔔</span>
            <h3>Smart Reminders</h3>
            <p>Never miss important medications or appointments with our intelligent reminder system.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f0f4f8',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  primaryButton: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '0.8rem 1.6rem',
    border: 'none',
    borderRadius: '4px',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '0.8rem 1.6rem',
    border: '1px solid #000',
    borderRadius: '4px',
  },
  featuresSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    width: '30%',
    textAlign: 'center',
  },
};

export default Home;