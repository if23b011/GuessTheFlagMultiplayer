import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        var email = user.email;
        document.getElementById("profile").innerText = email;
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
    }
});
