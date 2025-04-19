// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-a6a01.firebaseapp.com",
  projectId: "car-marketplace-a6a01",
  storageBucket: "car-marketplace-a6a01.firebasestorage.app",
  messagingSenderId: "905596239730",
  appId: "1:905596239730:web:c45da53e7f3f9a37c8a7eb",
  measurementId: "G-Q7HM50XM8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);