// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKqfGlCV2gETW74LAjiA64Y0jbzpwpf3E",
  authDomain: "hcp-project-2e390.firebaseapp.com",
  projectId: "hcp-project-2e390",
  storageBucket: "hcp-project-2e390.firebasestorage.app",
  messagingSenderId: "959005556019",
  appId: "1:959005556019:web:bfdaebf8efe52f47a5d246",
  measurementId: "G-G2P5KEH865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export authentication functions
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };