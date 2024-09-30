// src/components/EmergencyAlert.jsx
import React, { useState } from 'react';
import { useFirebase } from "../context/Firebase"; // Adjust the path if necessary
import './EmergencyAlert.css';

const EmergencyAlert = () => {
    const { db, addReview } = useFirebase(); // Access db and addReview from context
    const [emergencyNumber, setEmergencyNumber] = useState('');
    const [email, setEmail] = useState('');

    // Example function to handle review submission
    const handleSubmitReview = async () => {
        const caregiverId = 'someCaregiverId'; // Replace with actual caregiver ID
        const reviewText = 'Great service!'; // Replace with actual review text
        const rating = 5; // Replace with actual rating

        await addReview(caregiverId, reviewText, rating); // Call the addReview function
        alert('Review submitted successfully!');
    };

    // Function to handle emergency alert submission
    const handleEmergencyAlert = async () => {
        if (!emergencyNumber || !email) {
            alert('Please provide both an emergency number and an email address.');
            return;
        }

        // Here you would implement the logic to send the emergency alert
        // For example, you might want to send it to Firestore or send an email
        alert(`Emergency alert sent to ${email} with number ${emergencyNumber}`);
        
        // Clear input fields after submission
        setEmergencyNumber('');
        setEmail('');
    };

    return (
        <div>
            <h1>Emergency Alert</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Emergency Number" 
                    value={emergencyNumber} 
                    onChange={(e) => setEmergencyNumber(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleEmergencyAlert}>Send Emergency Alert</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSubmitReview}>Submit Review</button>
            </div>
        </div>
    );
};

export default EmergencyAlert;
