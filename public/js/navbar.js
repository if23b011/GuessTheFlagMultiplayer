import {
    collection,
    getDocs,
    getFirestore,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const db = getFirestore();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    const querySnapshot = getDocs(collection(db, "username"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        appendUser(doc.data().username);
    });

    if (user) {
        // User is signed in.
        document.getElementById("profile").innerText = querySnapshot;
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
    }
});
