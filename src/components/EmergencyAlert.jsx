// src/components/EmergencyAlert.jsx
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Make sure to import your Firebase configuration

const EmergencyAlert = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Send emergency alert to Firestore and SMS
  const sendEmergencyAlert = async () => {
    if (!alertMessage || !emergencyContact) {
      alert("Please enter an alert message and emergency contact.");
      return;
    }

    // Step 1: Send alert to Firestore
    await addDoc(collection(db, "alerts"), {
      message: alertMessage,
      timestamp: new Date(),
    });

    // Step 2: Send SMS to emergency contact via Cloud Function
    const response = await fetch('YOUR_CLOUD_FUNCTION_URL/sendSMS', { // Replace with your Cloud Function URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: alertMessage,
        to: emergencyContact,
      }),
    });

    if (response.ok) {
      alert("Emergency alert sent!");
    } else {
      alert("Failed to send alert. Please try again.");
    }

    // Clear input fields
    setAlertMessage("");
    setEmergencyContact("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Emergency Alert</h1>
      <input
        type="text"
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        placeholder="Type emergency message"
        style={styles.input}
      />
      <input
        type="text"
        value={emergencyContact}
        onChange={(e) => setEmergencyContact(e.target.value)}
        placeholder="Emergency Contact Number"
        style={styles.input}
      />
      <button onClick={sendEmergencyAlert} style={styles.button}>
        Send Alert
      </button>
    </div>
  );
};

// Styling for the Emergency Alert component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '20px auto',
  },
  heading: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EmergencyAlert;