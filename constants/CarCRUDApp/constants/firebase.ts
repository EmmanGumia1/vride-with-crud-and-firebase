import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAq7mM-Zv0TiY83_y7ZbcrwxbejW5j0MGU",
  authDomain: "vride-f00e9.firebaseapp.com",
  projectId: "vride-f00e9",
  storageBucket: "vride-f00e9.firebasestorage.app",
  messagingSenderId: "232122651606",
  appId: "1:232122651606:web:51d9a7129856d0345d8a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
