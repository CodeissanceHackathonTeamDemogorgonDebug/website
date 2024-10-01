import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Faqs = () => {
  return (
    
    <Link to="/Faqs" className="logoLink">
        <Navbar/>
    <div>
        <section id="fqs" style={styles.fqsSection}> {/* Add id for linking */}
        <h2 style={styles.subHead}>Frequently Asked Questions (FQS)</h2>
        <div style={styles.cardContainer}>
          {/* FQS Cards */}
          <div className="card fqsCard">
            <h3 style={styles.h3Card}>What services do you offer?</h3>
            <p style={styles.para}>We provide a range of services including home care, medical reminders, and telehealth consultations.</p>
          </div>

          <div className="card fqsCard">
            <h3 style={styles.h3Card}>How do I get started?</h3>
            <p style={styles.para}>Click on 'Get Started' to create your account and explore our services.</p>
          </div>

          <div className="card fqsCard">
            <h3 style={styles.h3Card}>Is there a subscription fee?</h3>
            <p style={styles.para}>We offer flexible pricing plans tailored to your needs. Contact us for details.</p>
          </div>

          <div className="card fqsCard">
            <h3 style={styles.h3Card}>Can I cancel my subscription?</h3>
            <p style={styles.para}>Yes, you can cancel your subscription anytime without any hidden fees.</p>
          </div>

          <div className="card fqsCard">
            <h3 style={styles.h3Card}>Can I cancel my subscription?</h3>
            <p style={styles.para}>Yes, you can cancel your subscription anytime without any hidden fees.</p>
          </div>

          <div className="card fqsCard">
            <h3 style={styles.h3Card}>Can I cancel my subscription?</h3>
            <p style={styles.para}>Yes, you can cancel your subscription anytime without any hidden fees.</p>
          </div>

          
        </div>
      </section>
    </div>
    </Link>
  )
}


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
    fqsSection: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#F9F9F9',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      gap: '1rem',
      flexWrap: 'wrap', 
      alignItems: 'center',
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
    },
    learnMoreLink: {
      display: 'inline-block',
      marginTop: '2rem',
      padding: '1rem 2rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      borderRadius: '5px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    // Card hover effect styles
    fqsCard: {
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: 'white',
    },
    // Add hover effect to FQS cards
    fqsCardHover: {
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      },
    }
  };
  
  
export default Faqs