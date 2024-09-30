import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useFirebase } from "../context/Firebase";

const Reminders = () => {
  const { user } = useFirebase(); // Get the logged-in user
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
    fetchReminders();
  };

  // Update a reminder
  const updateReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await updateDoc(reminderRef, { title: newTitle });
    setEditReminderId(null);
    setNewTitle("");
    fetchReminders();
  };

  // Delete a reminder
  const deleteReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await deleteDoc(reminderRef);
    fetchReminders();
  };

  return (
    <div>
      <h1>Reminders</h1>
      <input
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add a reminder"
      />
      <button onClick={addReminder}>Add Reminder</button>

      <ul>
        {reminders.map((item) => (
          <li key={item.id}>
            {editReminderId === item.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Update reminder"
                />
                <button onClick={() => updateReminder(item.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <button onClick={() => setEditReminderId(item.id)}>Edit</button>
                <button onClick={() => deleteReminder(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;