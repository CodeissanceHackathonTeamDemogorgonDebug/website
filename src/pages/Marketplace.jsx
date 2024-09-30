import React from 'react';
import Navbar from '../components/Navbar';

const caregivers = [
  { name: "Carol Davis", rating: 4.9, reviews: 78, distance: "1.2 miles", rate: 28, experience: 10, tags: ["Stroke Recovery", "Meal Preparation"] },
  { name: "Alice Johnson", rating: 4.8, reviews: 56, distance: "2.5 miles", rate: 25, experience: 5, tags: ["Elderly Care", "Medication Management"] },
  { name: "Frank Miller", rating: 4.8, reviews: 62, distance: "3.1 miles", rate: 26, experience: 8, tags: ["Parkinson's Care", "Medication Management"] },
  { name: "David Wilson", rating: 4.7, reviews: 35, distance: "4.5 miles", rate: 24, experience: 6, tags: ["Diabetes Management", "Physical Therapy"] },
  { name: "Bob Smith", rating: 4.6, reviews: 42, distance: "3.8 miles", rate: 22, experience: 7, tags: ["Alzheimer's Care", "Mobility Assistance"] },
  { name: "Eva Brown", rating: 4.5, reviews: 28, distance: "5.2 miles", rate: 20, experience: 3, tags: ["Companionship", "Light Housekeeping"] }
];

const CaregiverCard = ({ caregiver }) => (
  <div style={styles.caregiverCard}>
    <div style={styles.cardHeader}>
      <div style={styles.avatar}></div>
      <h3>{caregiver.name}</h3>
      <p>⭐ {caregiver.rating} ({caregiver.reviews} reviews)</p>
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

const Marketplace = () => {
  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h2>Available Care Givers</h2>
      <div style={styles.filters}>
        <input type="text" placeholder="Search caregivers..." style={styles.input} />
        <select style={styles.select}>
          <option>Highest Rated</option>
          <option>Lowest Price</option>
          <option>Most Experienced</option>
        </select>
        <button style={styles.button}>Filters</button>
      </div>
      <div style={styles.sliderContainer}>
        <label>Max Distance: <input type="range" min="0" max="50" /> 10 miles</label>
        <label>Max Hourly Rate: <input type="range" min="0" max="100" /> $30</label>
      </div>
      <div style={styles.caregiverGrid}>
        {caregivers.map(caregiver => (
          <CaregiverCard key={caregiver.name} caregiver={caregiver} />
        ))}
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '0 auto'
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px'
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px'
  },
  button: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  caregiverGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  caregiverCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '10px'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: '0 auto'
  },
  cardBody: {
    marginBottom: '10px'
  },
  tags: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#f0f0f0',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.9rem'
  },
  contactBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Marketplace;