import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const signOutButton = document.getElementById('signOutButton');
  
  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      const auth = getAuth();
      
      signOut(auth).then(() => {
        console.log('User signed out.');
        window.location.href = 'index.html?page=signIn';
      }).catch((error) => {
        console.error('Sign Out Error', error);
      });
    });
  }
});
