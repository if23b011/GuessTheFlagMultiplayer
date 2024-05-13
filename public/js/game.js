import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const gameID = new URLSearchParams(window.location.search).get("gameID");
const db = getFirestore(app);
const gameRef = await getDocs(collection(db, "games"));
const gameDoc = gameRef.docs.find((doc) => doc.id === gameID);

if (!gameDoc) {
    window.location.href = "index.html?page=home&error=game-not-found";
    console.log("Game not found");
}
$(".spinner-border").hide();
const game = gameDoc.data();
const flags = game.flags.match(/.{1,2}/g);

const flagRef = await getDocs(collection(db, "flags"));
var flagData = flagRef.docs.find((doc) => doc.data().id === flags[0]).data();

var index = 0;
var timer = 0;
var score = 0;
if (index == 0) {
    var intervalId;
    const flagElement = document.getElementById("flags");
    const startButton = document.createElement("button");
    startButton.classList.add("btn", "btn-primary");
    startButton.innerHTML = "Start";
    flagElement.appendChild(startButton);
    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        intervalId = setInterval(function () {
            timer++;
            document.getElementById("timer").innerHTML = "Time: " + formatTime(timer);
        }, 1000);
        showNextFlag();
        for (let i = 1; i <= 4; i++) {
            const flag = document.getElementById("flag" + i);
            flag.style.display = "block";
        }
    });
}

const buttonIds = ["flag1", "flag2", "flag3", "flag4"];
buttonIds.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", showNextFlag);
});

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return (
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
    );
}

function showNextFlag() {
    console.log("showNextFlag");
    if (index < flags.length) {
        flagData = flagRef.docs
            .find((doc) => doc.data().id === flags[index])
            .data();
        const flagElement = document.getElementById("flags");
        flagElement.innerHTML = "";
        const img = document.createElement("img");
        img.src = "../img/flags/" + flagData.name + ".png";
        img.alt = flagData.name;
        img.style.width = "500px";
        flagElement.appendChild(img);
    } else if (index == flags.length) {
        const flagElement = document.getElementById("flags");
        flagElement.innerHTML = "";
        const h1 = document.createElement("h1");
        h1.innerHTML = "Game Over!";
        flagElement.appendChild(h1);
        for (let i = 1; i <= 4; i++) {
            const flag = document.getElementById("flag" + i);
            flag.style.display = "none";
        }
        clearInterval(intervalId);
    }
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    console.log(randomIndex);
    const correctButton = document.getElementById("flag" + randomIndex);
    correctButton.innerHTML = flagData.name;
    const wrongButtons = buttonIds.filter((id) => id !== correctButton.id);
    wrongButtons.forEach((id) => {
        const wrongFlag =
            flagRef.docs[Math.floor(Math.random() * flagRef.size)].data();
        document.getElementById(id).innerHTML = wrongFlag.name;
    });
    correctButton.addEventListener("click", function () {
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
    });
    index++;
}
