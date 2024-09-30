// src/components/LoginPage.jsx

import React from 'react';
import { useFirebase } from '../context/Firebase';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { signInWithGoogle, user, logout } = useFirebase();

  const handleLogin = () => {
    signInWithGoogle();
  };

  // Inline styles
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
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
      borderRadius: '8px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '20px 30px',
      textAlign: 'center',
      width: '90%', // Responsive width
      maxWidth: '300px', // Max width for larger screens
    },
    heading: {
      marginBottom: '10px',
      fontSize: '24px',
    },
    subheading: {
      margin: '10px 0',
      fontSize: '18px',
    },
    button: {
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '16px',
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
  };

  return (
  <>
  <Navbar/>
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h1 style={styles.heading}>Welcome</h1>
          {user ? (
            <div>
              <h2 style={styles.subheading}>Hello, {user.displayName}</h2>
              <button
                style={{ ...styles.button, ...styles.buttonLogout }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <h2 style={styles.subheading}>Please log in</h2>
              <button
                style={styles.button}
                onClick={handleLogin}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
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