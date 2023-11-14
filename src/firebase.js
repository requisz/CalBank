// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBRg4J5gHpKkERc-xYLXnWrtRnOAtwO9u4",
  authDomain: "calorie-bank-app.firebaseapp.com",
  projectId: "calorie-bank-app",
  storageBucket: "calorie-bank-app.appspot.com",
  messagingSenderId: "167890653343",
  appId: "1:167890653343:web:e438c14dbc78258650d2aa",
  measurementId: "G-TKVWRFLNEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);