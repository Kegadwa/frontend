// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKi37t7kP-EGesMbdafdckuRoImO05Ylg",
  authDomain: "kalenjin-translator.firebaseapp.com",
  projectId: "kalenjin-translator",
  storageBucket: "kalenjin-translator.firebasestorage.app",
  messagingSenderId: "1058807996940",
  appId: "1:1058807996940:web:c9157b2099d392d1860429" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };