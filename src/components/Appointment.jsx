import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import './Appointment.css';

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
  const acceptAppointment = async (id, appointment) => {
    try {
      const appointmentRef = doc(db, 'AppointmentRequest', id);
      const newAppointment = {
        ...appointment,
        status: 'Accepted',
        time: appointment.time || new Date().toISOString(), // Set the current time if not provided
      };
      await updateDoc(appointmentRef, { status: 'Accepted', time: newAppointment.time });
      const appointmentCollection = collection(db, 'Appointment');
      await addDoc(appointmentCollection, newAppointment);
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
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="appointments">
      <h1>Appointment Requests</h1>
      <div className="appointment-list">
        {appointmentRequests.length === 0 ? (
          <p>No appointment requests available</p>
        ) : (
          appointmentRequests.map(({ id, patientuid, doctoruid, appointmentType, date, status }) => {
            // Convert timestamp to a readable date string
            const formattedDate = date?.toDate().toLocaleString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={id} className="appointment-card">
                <h2>Patient UID: {patientuid}</h2>
                <p><strong>Doctor UID:</strong> {doctoruid}</p>
                <p><strong>Appointment Type:</strong> {appointmentType}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Status:</strong> {status}</p>
                <div className="button-container">
                  <button className="accept-button" onClick={() => acceptAppointment(id, { ...appointment })}>Accept</button>
                  <button className="reject-button" onClick={() => rejectAppointment(id)}>Reject</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Appointments;
