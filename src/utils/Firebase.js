import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQW9fPvYaNJX2Vgn-Zz1IZTzPywGfUPnE",
  authDomain: "react-address-book-c5c88.firebaseapp.com",
  projectId: "react-address-book-c5c88",
  storageBucket: "react-address-book-c5c88.appspot.com",
  messagingSenderId: "555602749770",
  appId: "1:555602749770:web:a1c128afeb4592b749f9b3",
  measurementId: "G-WX3TZQHWQN",
  databaseURL:
    "https://react-address-book-c5c88-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeNewContact(
  userID,
  name,
  username,
  email,
  mobile,
  linkedin,
  twitter,
  workContact = false,
  country,
  city,
  street,
  postcode,
  remarks,
  meetings = []
) {
  const db = database();
  set(ref(db, "user/" + userID + "/contacts/"), {
    name,
    username,
    email,
    mobile,
    linkedin,
    twitter,
    workContact,
    country,
    city,
    street,
    postcode,
    remarks,
    meetings,
  });
}

export default database;
