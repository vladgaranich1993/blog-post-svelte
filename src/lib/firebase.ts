import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyA8tcGj_TyddNWw6yXDmI3bpHSGg_Mtg54",
  authDomain: "blog-svelte-app.firebaseapp.com",
  projectId: "blog-svelte-app",
  storageBucket: "blog-svelte-app.appspot.com",
  messagingSenderId: "951544795529",
  appId: "1:951544795529:web:af8012ffabd96167475158",
  measurementId: "G-L9ELMZ56Q5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
};
