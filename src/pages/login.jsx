
import React, { useState, useEffect } from "react";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Use context to access Firebase
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { signInWithGoogle, user, db, logout } = useFirebase(); // Access Firebase services
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    gender: '',
    profilePic: '',
    email: '',
    address: '',
    experienceYears: '',
    specialties: '',
    availability: '',
    hourlyRate: '',
    languages: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch user data only after role selection and user login
  useEffect(() => {
    if (user && role) {
      fetchUserData(); // Fetch user data based on the selected role
    }
  }, [user, role]);

  // Fetch user data from Firestore based on selected role
  const fetchUserData = async () => {
    if (!role || !user) return; // Ensure both role and user are available
    
    // Determine the collection based on the selected role
    const collectionName = role === "Caretaker" 
      ? "Caretakers" 
      : role === "Patient" 
      ? "Patients" 
      : "FamilyMembers";
  
    const q = query(collection(db, collectionName), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();

      // Only fetch data relevant to the selected role
      if (role === "Caretaker") {
        setFormData({
          ...formData,
          name: userData.name || '',
          age: userData.age || '',
          phoneNumber: userData.phoneNumber || '',
          gender: userData.gender || '',
          profilePic: userData.profilePic || '',
          email: userData.email || '',
          address: userData.address || '',
          experienceYears: userData.experienceYears || '',
          specialties: userData.specialties?.join(', ') || '',
          availability: userData.availability || '',
          hourlyRate: userData.hourlyRate || '',
          languages: userData.languages?.join(', ') || '',
        });
      }
      // Handle other roles similarly if needed
    }
  };

  // Handle role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit user form and save data to Firestore
  const handleFormSubmit = async () => {
    try {
      if (user) {
        // Determine the correct collection based on the selected role
        const collectionName = role === "Caretaker" 
          ? "Caretakers" 
          : role === "Patient" 
          ? "Patients" 
          : "FamilyMembers";
        
        const userRef = doc(db, collectionName, user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          name: formData.name,
          role: role,
          phoneNumber: formData.phoneNumber,
          age: formData.age,
          gender: formData.gender || '',
          profilePic: formData.profilePic || '',
          email: formData.email || '',
          address: formData.address || '',
          experienceYears: formData.experienceYears || '',
          specialties: formData.specialties.split(',').map(s => s.trim()), // Convert string back to list
          availability: formData.availability || '',
          hourlyRate: parseFloat(formData.hourlyRate) || 0,
          languages: formData.languages.split(',').map(l => l.trim()), // Convert string back to list
        }, { merge: true }); // Use merge to avoid overwriting existing fields
        
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Handle Google sign-in
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setRole(''); // Reset role on logout
      setFormSubmitted(false); // Reset form state
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.body}>
        <div style={styles.card}>
          {user ? (
            <>
              <div style={styles.welcomeMessage}>Welcome back, {user.displayName}!</div>
              {!role ? (
                <>
                  <h2>Select Your Role</h2>
                  <button onClick={() => handleRoleSelect('Caretaker')} style={styles.button}>Caretaker</button>
                  <button onClick={() => handleRoleSelect('Patient')} style={styles.button}>Patient</button>
                  <button onClick={() => handleRoleSelect('Family Member')} style={styles.button}>Family Member</button>
                </>
              ) : !formSubmitted ? (
                <>
                  <h2>Fill in Your Details ({role})</h2>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    style={styles.input}
                  />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    style={styles.input}
                  />
                  {role === 'Caretaker' && (
                    <>
                      <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        placeholder="Gender"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="profilePic"
                        value={formData.profilePic}
                        onChange={handleInputChange}
                        placeholder="Profile Picture URL"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        style={styles.input}
                      />
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        placeholder="Years of Experience"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="specialties"
                        value={formData.specialties}
                        onChange={handleInputChange}
                        placeholder="Specialties (comma separated)"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        placeholder="Availability"
                        style={styles.input}
                      />
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        placeholder="Hourly Rate"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                        placeholder="Languages Spoken (comma separated)"
                        style={styles.input}
                      />
                    </>
                  )}
                  <button onClick={handleFormSubmit} style={styles.button}>Submit Form</button>
                </>
              ) : (
                <>
                  <h2>Thank you for submitting the form!</h2>
                  <button onClick={handleLogout} style={styles.buttonLogout}>Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <h2>Please Sign In with Google</h2>
              <button onClick={handleLogin} style={styles.button}>
                Sign in with Google
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Styles
const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    background: '#f7f7f7',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    padding: '40px 50px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '450px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 25px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  buttonLogout: {
    backgroundColor: '#ff4d4d',
    marginTop: '20px',
  },
  welcomeMessage: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
};

export default LoginPage;