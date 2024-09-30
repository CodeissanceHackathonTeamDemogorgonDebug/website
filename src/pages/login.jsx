import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { signInWithGoogle, user, logout, db } = useFirebase();
  const [role, setRole] = useState('');
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  useEffect(() => {
    // Fetch the role from Firestore after login
    if (user) {
      const fetchRole = async () => {
        const docRef = db.collection('users').doc(user.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
          const userData = docSnap.data();
          setRole(userData.role);
          setIsRoleSelected(true);
        }
      };

      fetchRole();
    }
  }, [user, db]);

  const handleLogin = () => {
    signInWithGoogle();
  };

  const handleRoleSelect = async (selectedRole) => {
    if (user) {
      setRole(selectedRole);
      setIsRoleSelected(true);

      // Save the selected role to Firestore
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({ role: selectedRole }, { merge: true });
    }
  };

  const handleRoleChange = () => {
    setIsRoleSelected(false);
  };

  // Inline styles for improved UI
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    loginCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
      padding: '30px 40px',
      textAlign: 'center',
      width: '90%',
      maxWidth: '350px',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '26px',
      color: '#333',
    },
    subheading: {
      margin: '10px 0',
      fontSize: '20px',
      color: '#666',
    },
    button: {
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '12px 25px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '15px',
      transition: 'background-color 0.3s',
    },
    buttonLogout: {
      backgroundColor: '#ff4d4d',
    },
    buttonHover: {
      backgroundColor: '#357ae8',
    },
    buttonLogoutHover: {
      backgroundColor: '#e63939',
    },
    roleButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      margin: '10px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    changeRoleButton: {
      marginTop: '20px',
      padding: '8px 16px',
      fontSize: '14px',
      color: '#4caf50',
      backgroundColor: 'transparent',
      border: '1px solid #4caf50',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.body}>
        <div style={styles.loginContainer}>
          <div style={styles.loginCard}>
            <h1 style={styles.heading}>Welcome</h1>
            {user ? (
              <>
                {!isRoleSelected ? (
                  <div>
                    <h2 style={styles.subheading}>Select your role</h2>
                    <button
                      style={styles.roleButton}
                      onClick={() => handleRoleSelect('Patient')}
                    >
                      I am a Patient
                    </button>
                    <button
                      style={styles.roleButton}
                      onClick={() => handleRoleSelect('Caretaker')}
                    >
                      I am a Caretaker
                    </button>
                    <button
                      style={styles.roleButton}
                      onClick={() => handleRoleSelect('Family Member')}
                    >
                      I am a Family Member
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 style={styles.subheading}>Hello, {user.displayName}</h2>
                    <h3 style={styles.subheading}>Role: {role}</h3>
                    <button
                      style={{ ...styles.button, ...styles.buttonLogout }}
                      onClick={logout}
                    >
                      Logout
                    </button>
                    <button
                      style={styles.changeRoleButton}
                      onClick={handleRoleChange}
                    >
                      Change Role
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 style={styles.subheading}>Please log in</h2>
                <button
                  style={styles.button}
                  onClick={handleLogin}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.buttonHover.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.button.backgroundColor)
                  }
                >
                  Sign in with Google
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;