import { app } from "../js/firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
$(document).ready(function () {
    var upperCase = new RegExp("[A-Z]");
    var lowerCase = new RegExp("[a-z]");
    var numbers = new RegExp("[0-9]");
    var specialChars = new RegExp("[!@#$%^&.*]");
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
        if (password == passwordConfirm && password != "") {
            $("#passwordConfirmError").css("color", "#90ee90");
        } else {
            $("#passwordConfirmError").css("color", "red");
        }
    }

    $("#password, #passwordConfirm").on("keyup", checkPasswordStrength);
    // Formular-Submit-Event
    $("#signup-form").submit(async function (e) {
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

        const db = getFirestore(app);
        const getUserData = collection(db, "users");
        const querySnapshot = await getDocs(getUserData);
        let emailExists = false;
        let usernameExists = false;

        querySnapshot.forEach((doc) => {
            if (doc.data().email == email) {
                emailExists = true;
            }
            if (doc.data().username == username) {
                usernameExists = true;
            }
        });

        if (emailExists) {
            alert("Email-Adresse bereits registriert.");
            return;
        }

        if (usernameExists) {
            alert("Benutzername bereits vergeben.");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                try {
                    const docRef = await addDoc(
                        collection(getFirestore(app), "users"),
                        {
                            username: username,
                            email: email,
                        }
                    );
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                window.location.href = "index.html?page=home";
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
    var specialChars = new RegExp("[!@#$%^&.*]");
    var minLength = 8;
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();
    if (
        password.length >= minLength &&
        upperCase.test(password) &&
        lowerCase.test(password) &&
        numbers.test(password) &&
        specialChars.test(password) &&
        password == passwordConfirm
    ) {
        return true;
    } else {
        return false;
    }
}
