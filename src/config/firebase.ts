import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAhknW0aRSEdBJbGt8-yecax_4VAu_NZAU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ojosdearte-6d0a5.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ojosdearte-6d0a5",
  storageBucket: "ojosdearte-6d0a5.firebasestorage.app",
  messagingSenderId: "715022764635",
  appId: "1:715022764635:web:0ce8240bc289a6de664d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app; 