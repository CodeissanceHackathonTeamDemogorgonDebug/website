import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Use context to access Firebase

const EmergencyAlert = () => {
    const { db } = useFirebase(); // Access db from context
    const [alertMessage, setAlertMessage] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");

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

            alert("Emergency alert sent successfully!");
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
                placeholder="Emergency Contact Email"
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
