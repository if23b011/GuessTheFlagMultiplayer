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

const auth = getAuth();
const firestore = getFirestore();
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const q = query(
            collection(firestore, "users"),
            where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            document.getElementById("profile").innerText = userData.username;
        });
        document.getElementById("signOutButton").style.display = "block";
        document.getElementById("signUp").style.display = "none";
    } else {
        document.getElementById("profile").style.display = "none";
        document.getElementById("signOutButton").style.display = "none";
    }
});
