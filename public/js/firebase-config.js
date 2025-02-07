// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// Funktion, die die config.properties abruft und in ein Objekt parst
async function loadConfig() {
    const response = await fetch('config.json');
    if (!response.ok) throw new Error(`Konnte config.json nicht laden: ${response.statusText}`);
    return await response.json();
}


// Exportiere eine Promise, die das initialisierte App-Objekt liefert
export const app = loadConfig().then(config => {
    const firebaseConfig = {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId
    };
    return initializeApp(firebaseConfig);
});
