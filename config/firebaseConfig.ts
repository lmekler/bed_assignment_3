// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8sJXnfabeNnOEckN5k6SVc_ASOwvQHqY",
  authDomain: "bed-assignment-3-6ffc6.firebaseapp.com",
  projectId: "bed-assignment-3-6ffc6",
  storageBucket: "bed-assignment-3-6ffc6.firebasestorage.app",
  messagingSenderId: "485291593542",
  appId: "1:485291593542:web:b05e5d210caeb593599f47",
  measurementId: "G-TKYVXLCH1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);