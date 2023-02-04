import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQW9fPvYaNJX2Vgn-Zz1IZTzPywGfUPnE",
  authDomain: "react-address-book-c5c88.firebaseapp.com",
  projectId: "react-address-book-c5c88",
  storageBucket: "react-address-book-c5c88.appspot.com",
  messagingSenderId: "555602749770",
  appId: "1:555602749770:web:a1c128afeb4592b749f9b3",
  measurementId: "G-Y147ND4850",
  // measurementId: "G-WX3TZQHWQN",
  databaseURL:
    "https://react-address-book-c5c88-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Firebase Variables
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

export const analyticsLogEvent = (eventName) => {
  logEvent(analytics, eventName);
};
