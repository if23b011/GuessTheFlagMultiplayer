import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

$(document).ready(function () {
    // Formular-Submit-Event
    $("#signin-form").submit(function (e) {
        e.preventDefault();

        // Formular-Daten
        const email = $("#email").val();
        const password = $("#password").val();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "index.html?page=home";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    });
});
