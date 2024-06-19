import { app } from "../js/firebase-config.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore(app);
const flags = await fetch("../data/flags.json");
const flagsData = await flags.json();
const flagsCollection = collection(db, "flags");

// Check if flags collection already exists
const flagsQuery = query(flagsCollection);
const flagsSnapshot = await getDocs(flagsQuery);

if (flagsSnapshot.empty) {
    flagsData.forEach(async (flag) => {
        await addDoc(flagsCollection, flag);
    });
    console.log("flags collection created");
} else {
    console.log("flags collection already exists");
}
