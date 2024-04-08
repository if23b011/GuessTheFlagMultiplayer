import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyAVMLwfOMQHBj3FPbKjCqdVBtwL6QnE-0A",
    authDomain: "guess-the-flag-multiplayer.firebaseapp.com",
    projectId: "guess-the-flag-multiplayer",
    storageBucket: "guess-the-flag-multiplayer.appspot.com",
    messagingSenderId: "783358276815",
    appId: "1:783358276815:web:d6cb71a947ac78f2db73ba",
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
export { app };
