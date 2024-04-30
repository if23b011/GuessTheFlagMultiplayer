import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
document.getElementById("createGameWithSettings").addEventListener("click", async () => {
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
            console.log(randomFlag.name);
        } while (selectedFlags.includes(randomFlag.id) || randomFlag.name == undefined); // repeat until an unselected flag or undefined name is found
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
        window.location.href = "index.html?page=game&gameID=" + gameRef.id;
    }, 1000);
});
