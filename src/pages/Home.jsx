import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import './Home.css'; 

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <header style={styles.header}>
        <h1 style={styles.title}>Care that Connects</h1>
        <p>Empowering seniors with compassionate care and cutting-edge technology.</p>
        <div style={styles.buttonGroup}>
          <button className="button primary">Get Started</button>
          <button className="button secondary">Learn More</button>
        </div>
      </header>

      <section style={styles.featuresSection}>
        <h2 style={styles.subHead}>Why Choose CareMate?</h2>
        <div style={styles.cardContainer}>
          <div className="card">
            <span role="img" aria-label="heart" style={styles.emoji}>❤️</span>
            <h3 style={styles.h3Card}>Compassionate Care</h3>
            <p style={styles.para}>Our caregivers are trained to provide empathetic and personalized care.</p>
          </div>

          <div className="card">
            <span role="img" aria-label="network" style={styles.emoji}>👥</span>
            <h3 style={styles.h3Card}>Trusted Network</h3>
            <p style={styles.para}>Access a vetted network of professional caregivers in your area.</p>
          </div>

          {/* Link Smart Reminders to /reminders */}
          <Link to="/reminder" className="card">
            <span role="img" aria-label="reminder" style={styles.emoji}>🔔</span>
            <h3 style={styles.h3Card}>Smart Reminders</h3>
            <p style={styles.para}>Never miss important medications or appointments with our intelligent reminder system.</p>
          </Link>

          {/* Link Emergency Alert to /alert */}
          <Link to="/alerts" className="card">
            <span role="img" aria-label="emergency-alert" style={styles.emoji}>🚨</span>
            <h3 style={styles.h3Card}>Emergency Alert</h3>
            <p style={styles.para}>Get instant emergency alerts and ensure prompt medical assistance when needed.</p>
          </Link>

          {/* Link Health Data to /health */}
          <Link to="/health" className="card">
            <span role="img" aria-label="health-data" style={styles.emoji}>📊</span>
            <h3 style={styles.h3Card}>Health Data</h3>
            <p style={styles.para}>Track your health metrics with real-time data and stay informed about your well-being.</p>
          </Link>

          {/* Link Video Call to /calls */}
          <Link to="/calls" className="card">
            <span role="img" aria-label="video-call" style={styles.emoji}>📞</span>
            <h3 style={styles.h3Card}>Video Call</h3>
            <p style={styles.para}>Connect with your doctor via secure video calls for convenient medical consultations.</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} CareMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    fontStretch: 'expanded', 
  },
  subHead: {
    fontSize: '2.9rem',
    fontWeight: 'bold',
    fontStretch: 'expanded', 
    marginBottom: '2.8rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.7rem',
  },
  featuresSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
    flex: 1, // Ensures the section grows to fill the available space
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
    flexWrap: 'wrap', 
    alignItem: 'center',
  },
  h3Card: {
    fontSize: '1.8rem',
    fontWeight: '560',
  },
  para: {
    fontSize: '1.1rem',
  },
  emoji: {
    fontSize: '3rem',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '1.5rem',
  }
};

export default Home;
