
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-6251f.firebaseapp.com",
  projectId: "mern-blog-app-6251f",
  storageBucket: "mern-blog-app-6251f.firebasestorage.app",
  messagingSenderId: "961761565754",
  appId: "1:961761565754:web:dcd456f64dbd701a786903",
  measurementId: "G-WJEM4VEHC0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
