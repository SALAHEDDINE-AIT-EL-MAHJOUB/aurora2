// firebase-config.js - centralise l'initialisation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm_xhZFlPkGkjDoe5ciFpDc82Ji0WjrYk",
  authDomain: "portfolio-5aa4d.firebaseapp.com",
  projectId: "portfolio-5aa4d",
  storageBucket: "portfolio-5aa4d.firebasestorage.app",
  messagingSenderId: "868761896954",
  appId: "1:868761896954:web:5f4e6720838288e6c7c643",
  measurementId: "G-D0JDZ64838"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
