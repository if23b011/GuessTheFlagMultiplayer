import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        document.getElementById("profile").innerText = user.email;
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
    }
});
