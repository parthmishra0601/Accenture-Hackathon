// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from 'react'; // Import useState

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWGbzCFtHS6HQB1gl_Hy_FF5liK1n3vcc",
  authDomain: "supportbot-3731f.firebaseapp.com",
  projectId: "supportbot-3731f",
  storageBucket: "supportbot-3731f.firebasestorage.app",
  messagingSenderId: "126110826853",
  appId: "1:126110826853:web:d0305a1db025a41733e18c",
  measurementId: "G-RNBW3F8KTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    return { user, token, error: null };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return { user: null, token: null, error: { code: errorCode, message: errorMessage, email, credential } };
  }
};

// Function for Email and Password Sign-Up
export const signUpWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { user: null, error: { code: errorCode, message: errorMessage } };
  }
};

// Function for Email and Password Login
export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { user: null, error: { code: errorCode, message: errorMessage } };
  }
};

// Function for User Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { error: { code: errorCode, message: errorMessage } };
  }
};

// Function to Listen for Authentication State Changes (Returning State Directly)
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [user, loading];
};