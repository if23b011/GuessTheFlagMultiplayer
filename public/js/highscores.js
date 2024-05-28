import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    orderBy,
    limit,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

console.log("Highscores");

const db = getFirestore(app);
const highscoresRef = collection(db, "highscores");

const gameID = new URLSearchParams(window.location.search).get("gameID");
if (!gameID) {
    const queries = [
        { flagCount: 10, column: "col1" },
        { flagCount: 50, column: "col2" },
        { flagCount: 100, column: "col3" },
        { flagCount: 194, column: "col4" },
    ];

    for (const queryObj of queries) {
        const { flagCount, column } = queryObj;
        const q = await getDocs(
            query(
                highscoresRef,
                where("flagCount", "==", flagCount),
                orderBy("score", "desc"),
                orderBy("timer"),
                limit(10)
            )
        );

        q.forEach((doc) => {
            const data = doc.data();
            const columnElement = document.getElementById(column);
            columnElement.style.display = "block";
            const username = data.username;
            const score = data.score;
            const timer = data.timer;
            const gameID = data.gameID;
            const row = document.createElement("div");
            row.classList.add("row");
            const col1 = document.createElement("div");
            col1.classList.add("col");
            col1.innerHTML = "Username: " + username;
            row.appendChild(col1);
            columnElement.appendChild(row);
            const col2 = document.createElement("div");
            col2.classList.add("col");
            col2.innerHTML = "Score: " + score;
            row.appendChild(col2);
            columnElement.appendChild(row);
            const col3 = document.createElement("div");
            col3.classList.add("col");
            col3.innerHTML = "Zeit: " + formatTime(timer);
            row.appendChild(col3);
            columnElement.appendChild(row);
            const col4 = document.createElement("div");
            col4.classList.add("col");
            col4.innerHTML = "GameID: " + gameID.substring(0, 7);
            row.appendChild(col4);
            columnElement.appendChild(row);
            const gameButton = document.createElement("button");
            gameButton.classList.add("btn", "btn-dark");
            gameButton.innerHTML = "Zum Spiel";
            columnElement.appendChild(gameButton);
            gameButton.addEventListener("click", function () {
                window.location.href = "index.html?page=game&gameID=" + gameID;
            });
        });
    }
}
else {
    console.log("GameID: " + gameID);
    const q = await getDocs(query(highscoresRef, where("gameID", "==", gameID), orderBy("score", "desc"), orderBy("timer"), limit(10)));
    q.forEach((doc) => {
        const data = doc.data();
        const column0 = document.getElementById("col0");
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col");
        col1.innerHTML = "Username: " + username;
        row.appendChild(col1);
        column0.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col");
        col2.innerHTML = "Score: " + score;
        row.appendChild(col2);
        column0.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col");
        col3.innerHTML = "Zeit: " + formatTime(timer);
        row.appendChild(col3);
        column0.appendChild(row);
    });
}

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
