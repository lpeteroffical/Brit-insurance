// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAR4ejqHdQGc7ZydzUE6gE9EDmiu5srow",
  authDomain: "authtest-c7b06.firebaseapp.com",
  projectId: "authtest-c7b06",
  storageBucket: "authtest-c7b06.appspot.com",
  messagingSenderId: "813126354244",
  appId: "1:813126354244:web:bb1d74278a43b11ee9c311",
  measurementId: "G-NR0J67RQFS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

