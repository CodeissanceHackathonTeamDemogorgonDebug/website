import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

const EmergencyAlert = () => {
  const [alertMessage, setAlertMessage] = useState("");

  // Send emergency alert to Firestore
  const sendEmergencyAlert = async () => {
    await addDoc(collection(db, "alerts"), {
      message: alertMessage,
      timestamp: new Date(),
    });
    // You can also trigger Firebase Cloud Messaging here
    alert("Emergency alert sent!");
    setAlertMessage("");
  };

  return (
    <div>
      <h1>Emergency Alert</h1>
      <input
        type="text"
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        placeholder="Type emergency message"
      />
      <button onClick={sendEmergencyAlert}>Send Alert</button>
    </div>
  );
};

export default EmergencyAlert;