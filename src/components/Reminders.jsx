import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Use context to access Firebase

const Reminders = () => {
  const { user, db } = useFirebase(); // Get the logged-in user and Firestore database
  const [reminder, setReminder] = useState("");
  const [reminders, setReminders] = useState([]);
  const [editReminderId, setEditReminderId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (user) {
      fetchReminders(); // Fetch reminders when the user is authenticated
    }
  }, [user]);

  // Fetch reminders specific to the logged-in user
  const fetchReminders = async () => {
    if (!user) return; // Prevent fetching if no user is logged in

    const q = query(collection(db, "reminders"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const remindersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReminders(remindersArray);
  };

  // Add a reminder for the specific user
  const addReminder = async () => {
    if (!user) return;

    await addDoc(collection(db, "reminders"), {
      title: reminder,
      userId: user.uid, // Link reminder to the user
      createdAt: new Date(),
    });
    setReminder("");
    fetchReminders(); // Refresh the list
  };

  // Update a reminder
  const updateReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await updateDoc(reminderRef, { title: newTitle });
    setEditReminderId(null);
    setNewTitle("");
    fetchReminders(); // Refresh the list
  };

  // Delete a reminder
  const deleteReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await deleteDoc(reminderRef);
    fetchReminders(); // Refresh the list
  };

  return (
    <div style={styles.container}>
      <h1>Reminders</h1>
      <input
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add a reminder"
        style={styles.input}
      />
      <button onClick={addReminder} style={styles.button}>
        Add Reminder
      </button>

      <ul style={styles.reminderList}>
        {reminders.map((item) => (
          <li key={item.id} style={styles.reminderItem}>
            {editReminderId === item.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Update reminder"
                  style={styles.input}
                />
                <button onClick={() => updateReminder(item.id)} style={styles.button}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <button onClick={() => setEditReminderId(item.id)} style={styles.button}>
                  Edit
                </button>
                <button onClick={() => deleteReminder(item.id)} style={styles.button}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  button: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reminderList: {
    listStyleType: "none",
    padding: 0,
  },
  reminderItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",
  },
};

export default Reminders;