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


const gameID = new URLSearchParams(window.location.search).get("gameID");
const db = getFirestore(app);
const highscores = collection(db, "highscores");
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
                highscores,
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
            row.classList.add("row", "border");
            const col1 = document.createElement("div");
            col1.classList.add("col", "highscore-info");
            col1.innerHTML = username;
            row.appendChild(col1);
            columnElement.appendChild(row);
            const col2 = document.createElement("div");
            col2.classList.add("col", "highscore-info");
            col2.innerHTML = score;
            row.appendChild(col2);
            columnElement.appendChild(row);
            const col3 = document.createElement("div");
            col3.classList.add("col", "highscore-info");
            col3.innerHTML = formatTime(timer);
            row.appendChild(col3);
            columnElement.appendChild(row);
            const col4 = document.createElement("div");
            col4.classList.add("col", "highscore-info");
            col4.innerHTML = gameID.substring(0, 7);
            row.appendChild(col4);
            columnElement.appendChild(row);
            const gameButton = document.createElement("button");
            gameButton.classList.add("btn", "btn-info", "highscore-info", "mb-3", "w-50");
            gameButton.innerHTML = "Zum Spiel";
            const buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("d-flex", "justify-content-center");
            buttonWrapper.appendChild(gameButton);
            row.appendChild(buttonWrapper);
            gameButton.addEventListener("click", function () {
                window.location.href = "index.html?page=game&gameID=" + gameID;
            });
        });
    }
}
else {
    const highscoreRef = await getDocs(collection(db, "highscores"));
    const highscoreDoc = highscoreRef.docs.find((doc) => doc.data().gameID.startsWith(gameID));
    if (gameID !== highscoreDoc.data().gameID) {
        window.location.href = "index.html?page=highscores&gameID=" + highscoreDoc.data().gameID;
    }
    if (!highscoreDoc) {
        window.location.href = "index.html?page=home&error=game-not-found";
    }

    const highscoreRefGameID = await getDocs(
        query(
            highscores,
            where("gameID", "==", gameID),
            orderBy("score", "desc"),
            orderBy("timer"),
            limit(10)
        )
    );

    highscoreRefGameID.forEach((doc) => {
        const data = doc.data();
        const column0 = document.getElementById("col0");
        const header = document.createElement("div");
        header.classList.add("col-md-12", "highscores-border");
        header.id = "colheader";
        header.style.display = "block";
        const labelsRow = document.createElement("div");
        labelsRow.classList.add("row", "text-center", "border", "small-text");
        const labels = ["Username", "Score", "Time"];
        labels.forEach((label) => {
            const div = document.createElement("div");
            div.classList.add("col-md-4");
            div.innerHTML = label;
            labelsRow.appendChild(div);
        });
        header.appendChild(labelsRow);
        column0.appendChild(header);

        const row = document.createElement("div");
        row.classList.add("row", "border");
        const username = data.username;
        const score = data.score;
        const timer = data.timer;
        const col1 = document.createElement("div");
        col1.classList.add("col", "gameid-highscore");
        col1.innerHTML = username;
        row.appendChild(col1);
        column0.appendChild(row);
        const col2 = document.createElement("div");
        col2.classList.add("col", "gameid-highscore");
        col2.innerHTML = score;
        row.appendChild(col2);
        column0.appendChild(row);
        const col3 = document.createElement("div");
        col3.classList.add("col", "gameid-highscore");
        col3.innerHTML = formatTime(timer);
        row.appendChild(col3);
        column0.appendChild(row);
    });

}
function formatTime(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(3);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
