import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Use context to access Firebase

const EmergencyAlert = () => {
    const { db } = useFirebase(); // Access db from context
    const [alertMessage, setAlertMessage] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Send emergency alert to Firestore
    const sendEmergencyAlert = async () => {
        if (!alertMessage || !emergencyContact) {
            alert("Please enter an alert message and emergency contact.");
            return;
        }

        try {
            // Send alert to Firestore
            await addDoc(collection(db, "alerts"), {
                message: alertMessage,
                timestamp: new Date(),
                contact: emergencyContact, // Include contact for reference
            });

            setSuccessMessage("🚨 Emergency alert sent successfully!");
            // Clear input fields
            setAlertMessage("");
            setEmergencyContact("");
        } catch (error) {
            console.error("Error sending emergency alert:", error);
            alert("Failed to send emergency alert. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🚨 Emergency Alert</h1>
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
                placeholder="Emergency Contact Email"
                style={styles.input}
            />
            <button onClick={sendEmergencyAlert} style={styles.button}>
                Send Alert
            </button>
            {successMessage && <p style={styles.success}>{successMessage}</p>}
        </div>
    );
};

// Enhanced Crazy Styling
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        backgroundColor: '#1d1f21',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '400px',
        margin: '40px auto',
        animation: 'fadeIn 0.5s ease-in-out',
    },
    heading: {
        fontSize: '2rem',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        padding: '15px',
        borderRadius: '10px',
        border: '2px solid #ccc',
        width: '100%',
        marginBottom: '15px',
        fontSize: '1.1rem',
        backgroundColor: '#333',
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#007bff',
    },
    button: {
        padding: '15px 30px',
        borderRadius: '30px',
        border: 'none',
        background: 'linear-gradient(45deg, #ff0066, #ffcc33)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.3s',
    },
    buttonHover: {
        transform: 'scale(1.05)',
    },
    success: {
        marginTop: '20px',
        fontSize: '1.2rem',
        color: 'limegreen',
        fontWeight: 'bold',
    },
};

export default EmergencyAlert;
