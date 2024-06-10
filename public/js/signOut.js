import { app } from "../js/firebase-config.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const signOutButton = document.getElementById("signOutButton");

signOutButton.addEventListener("click", () => {
    const auth = getAuth(app);
    signOut(auth)
        .then(() => {
            console.log("User signed out.");
            window.location.href = "index.html?page=signIn";
        })
        .catch((error) => {
            console.error("Sign Out Error", error);
        });
});
