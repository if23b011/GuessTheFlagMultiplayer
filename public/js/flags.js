console.log("flags.js loaded");
import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "flags"));
const randomIndex = Math.floor(Math.random() * querySnapshot.size);
const randomFlag = querySnapshot.docs[randomIndex].data();
const flag = document.getElementById("randomFlag");
const img = document.createElement("img");
const solution = document.getElementById("solution");
solution.style.display = "none";
img.src = "../img/flags/" + randomFlag.name + ".png";
img.alt = randomFlag.name;
img.className = "flag";
img.style.width = "500px";
img.style.height = "auto";
flag.appendChild(img);

$("#solutionButton").click(showSolution);
function showSolution() {
    const solution = document.getElementById("solution");
    solution.textContent = randomFlag.name;
    solution.style.display = "block";
}

$("#nextButton").click(nextFlag);
function nextFlag() {
    location.reload();
}
