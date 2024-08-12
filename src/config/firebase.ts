// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHtjqqUMytPD6FVVWPQFeLSlMtjcHOtNk",
  authDomain: "berpdash.firebaseapp.com",
  projectId: "berpdash",
  storageBucket: "berpdash.appspot.com",
  messagingSenderId: "1024579959235",
  appId: "1:1024579959235:web:db5adb4efa51ab8b356576",
  measurementId: "G-TDPFGZ1TN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporting the connection constants
export default app;