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
    const q10 = await getDocs(query(highscoresRef, where("flagCount", "==", 10), orderBy("score", "desc"), orderBy("timer"), limit(10)));
    const q50 = await getDocs(query(highscoresRef, where("flagCount", "==", 50), orderBy("score", "desc"), orderBy("timer"), limit(10)));
    const q100 = await getDocs(query(highscoresRef, where("flagCount", "==", 100), orderBy("score", "desc"), orderBy("timer"), limit(10)));
    const q194 = await getDocs(query(highscoresRef, where("flagCount", "==", 194), orderBy("score", "desc"), orderBy("timer"), limit(10)));

    q10.forEach((doc) => {
        const data = doc.data();
        const column1 = document.getElementById("col1");
        column1.style.display = "block";
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col");
        col1.innerHTML = "Username: " + username;
        row.appendChild(col1);
        column1.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col");
        col2.innerHTML = "Score: " + score;
        row.appendChild(col2);
        column1.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col");
        col3.innerHTML = "Zeit: " + formatTime(timer);
        row.appendChild(col3);
        column1.appendChild(row);
    });
    q50.forEach((doc) => {
        const data = doc.data();
        const column2 = document.getElementById("col2");
        column2.style.display = "block";
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col");
        col1.innerHTML = "Username: " + username;
        row.appendChild(col1);
        column2.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col");
        col2.innerHTML = "Score: " + score;
        row.appendChild(col2);
        column2.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col");
        col3.innerHTML = "Zeit: " + formatTime(timer);
        row.appendChild(col3);
        column2.appendChild(row);
    });
    q100.forEach((doc) => {
        const data = doc.data();
        const column3 = document.getElementById("col3");
        column3.style.display = "block";
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col");
        col1.innerHTML = "Username: " + username;
        row.appendChild(col1);
        column3.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col");
        col2.innerHTML = "Score: " + score;
        row.appendChild(col2);
        column3.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col");
        col3.innerHTML = "Zeit: " + formatTime(timer);
        row.appendChild(col3);
        column3.appendChild(row);
    });
    q194.forEach((doc) => {
        const data = doc.data();
        const column4 = document.getElementById("col4");
        column4.style.display = "block";
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col");
        col1.innerHTML = "Username: " + username;
        row.appendChild(col1);
        column4.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col");
        col2.innerHTML = "Score: " + score;
        row.appendChild(col2);
        column4.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col");
        col3.innerHTML = "Zeit: " + formatTime(timer);
        row.appendChild(col3);
        column4.appendChild(row);
    });
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
