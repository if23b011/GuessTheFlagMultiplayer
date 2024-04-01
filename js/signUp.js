import { app } from "../js/firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
$(document).ready(function () {
    var upperCase = new RegExp("[A-Z]");
    var lowerCase = new RegExp("[a-z]");
    var numbers = new RegExp("[0-9]");
    var specialChars = new RegExp("[!@#\$%\^&\*]");
    var minLength = 8;
    function checkPasswordStrength() {
        var password = $("#password").val();
        var passwordConfirm = $("#passwordConfirm").val();
        if (password.length >= minLength) {
            $("#lengthError").css("color", "#90ee90");
        } else {
            $("#lengthError").css("color", "red");
        }
        if (upperCase.test(password)) {
            $("#upperCaseError").css("color", "#90ee90");
        } else {
            $("#upperCaseError").css("color", "red");
        }
        if (lowerCase.test(password)) {
            $("#lowerCaseError").css("color", "#90ee90");
        } else {
            $("#lowerCaseError").css("color", "red");
        }
        if (numbers.test(password)) {
            $("#numberError").css("color", "#90ee90");
        } else {
            $("#numberError").css("color", "red");
        }
        if (specialChars.test(password)) {
            $("#specialCharsError").css("color", "#90ee90");
        } else {
            $("#specialCharsError").css("color", "red");
        }
        if (password == passwordConfirm) {
            $("#passwordConfirmError").css("color", "#90ee90");
        } else {
            $("#passwordConfirmError").css("color", "red");
        }
    }

    $("#password, #passwordConfirm").on("keyup", checkPasswordStrength);
    // Formular-Submit-Event
    $("#signup-form").submit(function (e) {
        e.preventDefault();

        // Formular-Daten
        const email = $("#email").val();
        const password = $("#password").val();
        const username = $("#username").val();

        if (validatePassword(password) == false) {
            alert("Passwort entspricht nicht den Anforderungen.");
            return;
        }

        if (validateEmail(email) == false) {
            alert("Email-Adresse ist nicht gültig.");
            return;
        }


        if (username == "") {
            alert("Bitte geben Sie einen Benutzernamen ein.");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "index.html?page=signIn";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);
            });
    });
});

// Validate the form
function validateEmail(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    var upperCase = new RegExp("[A-Z]");
    var lowerCase = new RegExp("[a-z]");
    var numbers = new RegExp("[0-9]");
    var specialChars = new RegExp("[!@#\$%\^&\*]");
    var minLength = 8;
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();
    if (password.length >= minLength
        && upperCase.test(password)
        && lowerCase.test(password)
        && numbers.test(password)
        && specialChars.test(password)
        && password == passwordConfirm) {
        return true;
    } else {
        return false;
    }
}


