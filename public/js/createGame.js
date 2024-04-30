import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
document.getElementById("createGameWithSettings").addEventListener("click", async () => {
    //timer
    let timer = 0;
    let intervalId = setInterval(function() {
        timer++;
        console.log(timer);
    }, 1000);
    const amountOfFlags = document.getElementById("selectNumberOfFlags").value;
    const querySnapshot = await getDocs(collection(db, "flags"));
    var gameID = "";
    var selectedFlags = [];
    for (let i = 0; i < amountOfFlags; i++) {
        let randomIndex;
        let randomFlag;
        do {
            randomIndex = Math.floor(Math.random() * querySnapshot.size);
            randomFlag = querySnapshot.docs[randomIndex].data();
        } while (selectedFlags.includes(randomFlag.id)); // wiederholen bis eine noch nicht ausgewählte flagge
        console.log(randomFlag.id);
        gameID += randomFlag.id;
        selectedFlags.push(randomFlag.id);
    }
    const gameRef = await addDoc(collection(db, "games"), {
        flags: gameID,
        count: amountOfFlags,
    });
    console.log("Game created with ID: ", gameRef.id);
    console.log(amountOfFlags);
    setTimeout(() => {
    //end timer
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
        window.location.href = "index.html?page=game&gameID=" + gameRef.id;
    }, 1000);
});
