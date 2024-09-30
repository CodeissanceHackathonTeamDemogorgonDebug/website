// src/components/CaregiverCard.jsx

import React from 'react';

const CaregiverCard = ({ caregiver }) => (
  <div style={styles.caregiverCard}>
    <div style={styles.cardHeader}>
      <div style={styles.avatar}></div>
      <h3>{caregiver.name}</h3>
      <p>⭐ {caregiver.averageRating.toFixed(1)} ({caregiver.reviewCount} reviews)</p>
      <p>{caregiver.distance} away</p>
    </div>
    <div style={styles.cardBody}>
      <p><strong>Hourly Rate:</strong> ${caregiver.rate}</p>
      <p><strong>Experience:</strong> {caregiver.experience} years</p>
      <div style={styles.tags}>
        {caregiver.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}
      </div>
    </div>
    <button style={styles.contactBtn}>Contact Caregiver</button>
  </div>
);

// Styles
const styles = {
  caregiverCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: '0 auto',
  },
  cardBody: {
    marginBottom: '10px',
  },
  tags: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  contactBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CaregiverCard;