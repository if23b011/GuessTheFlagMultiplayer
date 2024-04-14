import {
    getAuth,
    onAuthStateChanged,
    signOut // Import für signOut hinzufügen
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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
            document.getElementById("profile").innerText = userData.username;
        });
        document.getElementById('signOutButton').style.display = 'block';
    } else {
        // No user is signed in.
        document.getElementById("profile").innerText = "Not logged in";
        document.getElementById('signOutButton').style.display = 'none';
    }
});

// signOut
document.addEventListener('DOMContentLoaded', () => {
    const signOutBtn = document.getElementById('signOutButton');
    if(signOutBtn){
        signOutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('User signed out.');
                window.location.href = 'index.html?page=signIn';
            }).catch((error) => {
                console.error('Sign Out Error', error);
            });
        });
    }
});
