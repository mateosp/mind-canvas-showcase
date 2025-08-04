import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhknW0aRSEdBJbGt8-yecax_4VAu_NZAU",
  authDomain: "ojosdearte-6d0a5.firebaseapp.com",
  projectId: "ojosdearte-6d0a5",
  storageBucket: "ojosdearte-6d0a5.firebasestorage.app",
  messagingSenderId: "715022764635",
  appId: "1:715022764635:web:0ce8240bc289a6de664d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app; 