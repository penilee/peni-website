// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "ntu-gen-ai-peni.firebaseapp.com",
  projectId: "ntu-gen-ai-peni",
  storageBucket: "ntu-gen-ai-peni.firebasestorage.app",
  messagingSenderId: "552024759220",
  appId: "1:552024759220:web:f09bd28e0651964a9e70e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };