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
    const instructionDiv = document.createElement("div");
    instructionDiv.innerHTML = "<h1>Um das Spiel zu starten, den Button klicken!</h1>";
    instructionDiv.style.marginBottom = "20px";
    flagElement.appendChild(instructionDiv);
    const startButton = document.createElement("button");
    startButton.classList.add("btn", "btn-dark");
    startButton.innerHTML = "Start";
    startButton.style.marginTop = "20px";
    startButton.style.fontSize = "20px";
    startButton.style.padding = "10px 30px";
    flagElement.appendChild(startButton);
    startButton.addEventListener("click", function () {
        //Timer wird sobald er fertig geladen ist überschrieben
        document.getElementById("timer").innerHTML = "Time: 00:00";
        startButton.style.display = "none";
        document.getElementById("score").innerHTML = "Score: " + score;
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
    if (index < flags.length) {
        const flagCount = document.getElementById("flagCount");
        flagCount.innerHTML = "Flag " + (index + 1) + " of " + flags.length;
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
        flagCount.innerHTML = "";
    }

    const randomIndex = Math.floor(Math.random() * 4) + 1;
    console.log(randomIndex);
    const correctButton = document.getElementById("flag" + randomIndex);
    correctButton.innerHTML = flagData.name;
    const wrongButtons = buttonIds.filter((id) => id !== correctButton.id);

    buttonIds.forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    document.getElementById(correctButton.id).addEventListener("click", function () {
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        showNextFlag();
    });

    wrongButtons.forEach((id) => {
        document.getElementById(id).addEventListener("click", function () {
            showNextFlag();
        });
    });

    wrongButtons.forEach((id) => {
        let wrongFlag;
        do {
            wrongFlag = flagRef.docs[Math.floor(Math.random() * flagRef.size)].data();
        } while (wrongFlag.name == undefined || wrongFlag.name === flagData.name || document.getElementById(id).innerHTML === wrongFlag.name);
        document.getElementById(id).innerHTML = wrongFlag.name;
    });

    index++;
}