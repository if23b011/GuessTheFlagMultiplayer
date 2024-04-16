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

const randomIndex = Math.floor(Math.random() * flagRef.size);
const randomFlag = flagRef.docs[randomIndex].data();

var index = 0;
var points = 0;
const flag1 = document.getElementById("flag1");
const flag2 = document.getElementById("flag2");
const flag3 = document.getElementById("flag3");
const flag4 = document.getElementById("flag4");

flag1.innerHTML = flagData.name;
flag2.innerHTML = randomFlag.name;
flag3.innerHTML = randomFlag.name;
flag4.innerHTML = randomFlag.name;

const buttonIds = ["flag1", "flag2", "flag3", "flag4"];

buttonIds.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", showNextFlag);
});

function showNextFlag() {
    index++;
    const nextFlagData = flagRef.docs
        .find((doc) => doc.data().id === flags[index])
        .data();
    img.src = "../img/flags/" + nextFlagData.name + ".png";
    img.alt = nextFlagData.name;
    flag1.innerHTML = nextFlagData.name;
}
const flagElement = document.createElement("div");
const img = document.createElement("img");
img.src = "../img/flags/" + flagData.name + ".png";
img.alt = flagData.name;
img.style.width = "180px";
document.querySelector(".flags").appendChild(flagElement);
flagElement.appendChild(img);
