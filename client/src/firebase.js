// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d82d4.firebaseapp.com",
  projectId: "mern-estate-d82d4", 
  storageBucket: "mern-estate-d82d4.appspot.com",
  messagingSenderId: "418644904618",
  appId: "1:418644904618:web:8d3e7e10237b0aad521ed3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);