import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const gameID = new URLSearchParams(window.location.search).get("gameID");
const db = getFirestore(app);
const gameRef = await getDocs(collection(db, "games"));
const gameDoc = gameRef.docs.find((doc) => doc.id.startsWith(gameID));
if (gameID !== gameDoc.id) {
    window.location.href = "index.html?page=game&gameID=" + gameDoc.id;
}


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
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            const highscoreNotSaved = document.createElement("div");
            highscoreNotSaved.innerHTML = "<h1>Um deinen Highscore zu speichern, bitte einloggen!</h1>";
            flagElement.appendChild(highscoreNotSaved);
        }
    });
    const startButton = document.createElement("button");
    startButton.classList.add("btn", "btn-info");
    startButton.innerHTML = "Start";
    startButton.style.marginTop = "20px";
    startButton.style.fontSize = "20px";
    startButton.style.padding = "10px 30px";
    flagElement.appendChild(startButton);
    startButton.addEventListener("click", function () {
        document.getElementById("choice").innerHTML = "Wähle die richtige Flagge!";
        document.getElementById("timer").innerHTML = "Zeit: 00:00";
        startButton.style.display = "none";
        document.getElementById("score").innerHTML = "Score: " + score;
        intervalId = setInterval(function () {
            timer++;
            document.getElementById("timer").innerHTML = "Zeit: " + formatTime(timer);
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
        flagCount.innerHTML = "Flagge " + (index + 1) + " von " + flags.length;
        flagData = flagRef.docs
            .find((doc) => doc.data().id === flags[index])
            .data();
        const flagElement = document.getElementById("flags");
        flagElement.innerHTML = "";
        const img = document.createElement("img");
        img.src = "../img/flags/" + flagData.name + ".png";
        img.alt = flagData.name;
        img.style.height = "200px";
        img.style.border = "2px solid black";
        flagElement.appendChild(img);
    } else if (index == flags.length) {
        const flagElement = document.getElementById("flags");
        flagElement.innerHTML = "";
        document.getElementById("choice").innerHTML = "";
        const h1 = document.createElement("h1");
        h1.innerHTML = "Game Over!";
        flagElement.appendChild(h1);
        for (let i = 1; i <= 4; i++) {
            const flag = document.getElementById("flag" + i);
            flag.style.display = "none";
        }
        clearInterval(intervalId);
        flagCount.innerHTML = "";
        const highscoreButton = document.createElement("button");
        highscoreButton.classList.add("btn", "btn-info");
        highscoreButton.innerHTML = "Highscores für dieses Spiel";
        highscoreButton.style.marginTop = "20px";
        highscoreButton.style.fontSize = "20px";
        highscoreButton.style.padding = "10px 30px";
        flagElement.appendChild(highscoreButton);
        highscoreButton.addEventListener("click", function () {
            window.location.href = "index.html?page=highscores&gameID=" + gameID;
        });
        const auth = getAuth();
        const firestore = getFirestore();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(
                    collection(firestore, "users"),
                    where("email", "==", user.email)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    const username = userData.username;
                    saveHighscore(flags.length, gameID, score, timer, username);
                });
            }
        });
    }

    const randomIndex = Math.floor(Math.random() * 4) + 1;
    const correctButton = document.getElementById("flag" + randomIndex);
    correctButton.innerHTML = flagData.name.replace(/([A-Z])/g, ' $1').replace(/(Von|Und|Die)/g, (match) => match.toLowerCase());
    const wrongButtons = buttonIds.filter((id) => id !== correctButton.id);

    buttonIds.forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    document.getElementById(correctButton.id).addEventListener("click", function () {
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("choice").innerHTML = "Richtig!";
        document.getElementById("choice").style.color = "green";
        showNextFlag();
    });

    wrongButtons.forEach((id) => {
        document.getElementById(id).addEventListener("click", function () {
            document.getElementById("choice").innerHTML = "Falsch!";
            document.getElementById("choice").style.color = "red";
            showNextFlag();
        });
    });

    wrongButtons.forEach((id) => {
        let wrongFlag;
        do {
            wrongFlag = flagRef.docs[Math.floor(Math.random() * flagRef.size)].data();
        } while (wrongFlag.name == undefined || wrongFlag.name === flagData.name || document.getElementById(id).innerHTML === wrongFlag.name);
        document.getElementById(id).innerHTML = wrongFlag.name.replace(/([A-Z])/g, ' $1').replace(/(Von|Und|Die)/g, (match) => match.toLowerCase());
    });

    index++;
}

function saveHighscore(flagCount, gameID, score, timer, username) {
    const highscore = {
        flagCount,
        gameID,
        score,
        timer,
        username,
    };
    const highscoresRef = collection(db, "highscores");
    addDoc(highscoresRef, highscore);
    console.log("Highscore saved");
}
