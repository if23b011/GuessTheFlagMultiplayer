import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in.
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById("profile").innerText = userData.username;
        } else {
            console.log("User data not found");
        }
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
    }
});
