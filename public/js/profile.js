import { app } from "../js/firebase-config.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth(app);
const firestore = getFirestore(app);
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const q = query(
            collection(firestore, "users"),
            where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        if (doc) {
            const userData = doc.data();
            const username = userData.username;
            const email = userData.email;
            const details = document.getElementById("details");
            details.innerHTML = `<h1><strong>Username:</strong> ${username}</h1><h1><strong>Email:</strong> ${email}</h1>`;
        }
    }
});

