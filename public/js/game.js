import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const gameID = new URLSearchParams(window.location.search).get("gameID");
const db = getFirestore(app);
const gameRef = await getDocs(collection(db, "games"));
const game = gameRef.docs.find((doc) => doc.id === gameID).data();
const flags = game.flags.match(/.{1,2}/g);

const flagRef = await getDocs(collection(db, "flags"));
const flagData = flagRef.docs.find((doc) => doc.data().id === flags[0]).data();

var index = 0;
document.getElementById("nextFlag").addEventListener("click", () => {
    index++;
    const nextFlagData = flagRef.docs
        .find((doc) => doc.data().id === flags[index])
        .data();
    img.src = "../img/flags/" + nextFlagData.name + ".png";
    img.alt = nextFlagData.name;
    if (index === flags.length - 1) {
        document.getElementById("nextFlag").disabled = true;
    }
});
const flagElement = document.createElement("div");
const img = document.createElement("img");
img.src = "../img/flags/" + flagData.name + ".png";
img.alt = flagData.name;
img.style.width = "180px";
document.querySelector(".flags").appendChild(flagElement);
flagElement.appendChild(img);
