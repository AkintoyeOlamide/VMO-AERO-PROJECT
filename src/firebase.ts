import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAd4_5bJWbOVD578KyXspkUuwjC14gUzp4",
  authDomain: "vmo-aero.firebaseapp.com",
  projectId: "vmo-aero",
  storageBucket: "vmo-aero.firebasestorage.app",
  messagingSenderId: "522059082670",
  appId: "1:522059082670:web:1ed182437eac871b5c363f",
  measurementId: "G-CE4Q19FJ9N"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 