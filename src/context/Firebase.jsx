// src/context/Firebase.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpUXcH5ZXshC_Ihh1KM0G4yPmGh7YkvVE",
    authDomain: "hackathon-elderly-thing.firebaseapp.com",
    projectId: "hackathon-elderly-thing",
    storageBucket: "hackathon-elderly-thing.appspot.com",
    messagingSenderId: "41117400610",
    appId: "1:41117400610:web:3e8a1463654e7723aa947b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google Sign In: ", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};