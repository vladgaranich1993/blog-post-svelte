// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8tcGj_TyddNWw6yXDmI3bpHSGg_Mtg54",
  authDomain: "blog-svelte-app.firebaseapp.com",
  projectId: "blog-svelte-app",
  storageBucket: "blog-svelte-app.appspot.com",
  messagingSenderId: "951544795529",
  appId: "1:951544795529:web:af8012ffabd96167475158",
  measurementId: "G-L9ELMZ56Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);