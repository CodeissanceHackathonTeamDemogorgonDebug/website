import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase'; // assuming you have this hook from your Firebase context
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const Appointments = () => {
  const { db } = useFirebase();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointment requests from Firestore
  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'AppointmentRequest'));
        const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointmentRequests(requests);
      } catch (error) {
        console.error("Error fetching appointment requests: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentRequests();
  }, [db]);

  // Handle appointment acceptance
  const acceptAppointment = async (id, time) => {
    try {
      const appointmentRef = doc(db, 'AppointmentRequest', id);
      // Move the appointment to the Appointment collection with assigned time
      const newAppointment = {
        ...appointmentRequests.find(request => request.id === id),
        time,
        status: 'Accepted',
      };
      await updateDoc(appointmentRef, { status: 'Accepted' });
      const appointmentCollection = collection(db, 'Appointment');
      await addDoc(appointmentCollection, newAppointment);
      // Remove from the appointment requests after moving
      await deleteDoc(appointmentRef);
      setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error accepting appointment: ', error);
    }
  };

  // Handle appointment rejection
  const rejectAppointment = async (id) => {
    try {
      const appointmentRef = doc(db, 'AppointmentRequest', id);
      await deleteDoc(appointmentRef);
      setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error rejecting appointment: ', error);
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="appointments">
      <h1>Appointment Requests</h1>
      <div className="appointment-list">
        {appointmentRequests.length === 0 ? (
          <p>No appointment requests available</p>
        ) : (
          appointmentRequests.map(({ id, patientName, reason, time }) => (
            <div key={id} className="appointment-card">
              <h2>{patientName}</h2>
              <p>{reason}</p>
              <label>
                Appointment Time: 
                <input 
                  type="datetime-local"
                  onChange={(e) => time = e.target.value} // Set the time for acceptance
                />
              </label>
              <button onClick={() => acceptAppointment(id, time)}>Accept</button>
              <button onClick={() => rejectAppointment(id)}>Reject</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
