import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Appointment.css';

const Appointments = () => {
  const { db } = useFirebase();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});
  const [videoCallUrls, setVideoCallUrls] = useState({});

  // Fetch appointment requests and accepted appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // Fetch appointment requests
        const querySnapshot = await getDocs(collection(db, 'AppointmentRequest'));
        const requests = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          
          // Fetch patient name using patientuid
          const patientDoc = await getDoc(doc(db, 'Patients', requestData.patientuid));
          const patientName = patientDoc.exists() ? patientDoc.data().name : 'Unknown Patient';

          return {
            id: docSnap.id,
            patientName,
            ...requestData
          };
        }));
        setAppointmentRequests(requests);

        // Fetch accepted appointments
        const acceptedSnapshot = await getDocs(collection(db, 'Appointment'));
        const accepted = acceptedSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        setAcceptedAppointments(accepted);

      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [db]);

  // Function to generate a ZEGOCLOUD video call URL
  const generateVideoCallUrl = async (appointmentId) => {
    const appID = '1764494396'; // Replace with your ZEGOCLOUD App ID
    const serverSecret = '035b33ebeb11f47504c0d059444bc233'; // Replace with your ZEGOCLOUD Server Secret
    const userID = `user_${appointmentId}`;
    const roomID = `room_${appointmentId}`;
    
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userID);
    
    console.log('Generated Kit Token:', kitToken); // Debugging line

    const zegoCall = ZegoUIKitPrebuilt.create(kitToken);
    
    return zegoCall;
  };

  // Handle appointment acceptance with selected time and video call
  const acceptAppointment = async (id, appointment) => {
    try {
      const selectedTime = selectedTimes[id];
      if (!selectedTime) {
        alert('Please select a time before accepting the appointment.');
        return;
      }

      const appointmentRef = doc(db, 'AppointmentRequest', id);
      const newAppointment = {
        ...appointment,
        status: 'Accepted',
        time: selectedTime,
      };

      const appointmentCollection = collection(db, 'Appointment');
      await addDoc(appointmentCollection, newAppointment);
      await deleteDoc(appointmentRef);

      const zegoCall = await generateVideoCallUrl(id);
      setVideoCallUrls((prevUrls) => ({
        ...prevUrls,
        [id]: zegoCall,
      }));

      setStatusUpdates({
        ...statusUpdates,
        [id]: 'Accepted',
      });

      setAcceptedAppointments([...acceptedAppointments, newAppointment]);
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

      setStatusUpdates({
        ...statusUpdates,
        [id]: 'Rejected',
      });

      setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error rejecting appointment: ', error);
    }
  };

  // Handle time selection change
  const handleTimeChange = (id, event) => {
    setSelectedTimes({
      ...selectedTimes,
      [id]: event.target.value,
    });
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
          appointmentRequests.map(({ id, patientName, doctoruid, appointmentType, date, status }) => {
            const formattedDate = date?.toDate().toLocaleString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={`request-${id}`} className="appointment-card">
                <h2>Patient: {patientName}</h2>
                <p><strong>Doctor UID:</strong> {doctoruid}</p>
                <p><strong>Appointment Type:</strong> {appointmentType}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Status:</strong> {statusUpdates[id] || status}</p>
                
                {statusUpdates[id] ? (
                  <p className={`status-message ${statusUpdates[id].toLowerCase()}`}>
                    This appointment was {statusUpdates[id].toLowerCase()}.
                  </p>
                ) : (
                  <>
                    <div className="time-selection">
                      <label htmlFor={`time-${id}`}>Select Time:</label>
                      <input
                        type="datetime-local"
                        id={`time-${id}`}
                        value={selectedTimes[id] || ''}
                        onChange={(event) => handleTimeChange(id, event)}
                      />
                    </div>
                    <div className="button-container">
                      <button className="accept-button" onClick={() => acceptAppointment(id, { ...appointmentRequests.find(req => req.id === id) })}>
                        Accept
                      </button>
                      <button className="reject-button" onClick={() => rejectAppointment(id)}>Reject</button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <h1>Accepted Appointments</h1>
      <div className="accepted-appointment-list">
        {acceptedAppointments.length === 0 ? (
          <p>No accepted appointments</p>
        ) : (
          acceptedAppointments.map(({ id, patientName, doctoruid, appointmentType, time }) => {
            const formattedTime = new Date(time).toLocaleString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={`accepted-${id}`} className="appointment-card">
                <h2>Patient: {patientName}</h2>
                <p><strong>Doctor UID:</strong> {doctoruid}</p>
                <p><strong>Appointment Type:</strong> {appointmentType}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                {videoCallUrls[id] && (
                  <div className="video-call-section">
                    <a href={videoCallUrls[id]} target="_blank" rel="noopener noreferrer" className="video-call-button">
                      Start Video Call
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Appointments;
