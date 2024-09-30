import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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
const db = getFirestore(app); // Initialize Firestore

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading to true
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      // Optional: Store user info in Firestore here
    } catch (error) {
      console.error("Error during Google Sign In: ", error);
      // Show error message to user
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  // Function to log out the user
  const logout = async () => {
    setLoading(true); // Set loading to true
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout: ", error);
      // Show error message to user
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  // Function to add a review for a caregiver
  const addReview = async (caregiverId, reviewText, rating) => {
    try {
      const reviewsCollection = collection(db, 'reviews');
      await addDoc(reviewsCollection, {
        caregiverId,
        reviewText,
        rating,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding review: ", error);
      // Show error message to user
    }
  };

  // Set up an effect to manage user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  // Provide user and authentication functions to the context
  return (
    <FirebaseContext.Provider value={{ user, loading, signInWithGoogle, logout, db, addReview }}>
      {children}
    </FirebaseContext.Provider>
  );
};