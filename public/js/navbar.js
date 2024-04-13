import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
<<<<<<< Updated upstream
import { 
    getFirestore,
    doc,
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
=======
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth();
const firestore = getFirestore();
>>>>>>> Stashed changes

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in.
<<<<<<< Updated upstream
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById("profile").innerText = userData.username;
        } else {
            console.log("User data not found");
        }
=======
        // Fetch the user document from Firestore based on email
        const q = query(
            collection(firestore, "users"),
            where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            // Display the username in the navbar
            document.getElementById("profile").innerText = userData.username;
        });
>>>>>>> Stashed changes
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
    }
});
