import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const db = getFirestore(app);
const amountOfFlags = 5;
const querySnapshot = await getDocs(collection(db, "flags"));
var gameID = "";
for (let i = 0; i < amountOfFlags; i++) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomFlag = querySnapshot.docs[randomIndex].data();
    console.log(randomFlag.id);
    gameID += randomFlag.id;
}
const gameRef = await addDoc(collection(db, "games"), {
    flags: gameID,
});
console.log("Game created with ID: ", gameRef.id);
setTimeout(() => {
    window.location.href = "index.html?page=game&gameID=" + gameRef.id;
}, 1000);