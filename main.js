import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdgAITXTldockRB_wgxOrbNUPKzSVBhDs",
    authDomain: "insan-cemerlang-c9554.firebaseapp.com",
    projectId: "insan-cemerlang-c9554",
    storageBucket: "insan-cemerlang-c9554.appspot.com",
    messagingSenderId: "753628555075",
    appId: "1:753628555075:web:7a72b2d1e8ae89716931f6",
    measurementId: "G-KMJZ5V0B8H"
  };
