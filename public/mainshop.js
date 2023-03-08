import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, updateDoc, doc, arrayUnion, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnjaagxgsYF8nTg8PEnZzO4RjH87pn78E",
  authDomain: "myshop-6c6b0.firebaseapp.com",
  projectId: "myshop-6c6b0",
  storageBucket: "myshop-6c6b0.appspot.com",
  messagingSenderId: "68428404133",
  appId: "1:68428404133:web:8d97f6443b7be0349fc44c",
  measurementId: "G-4PFY4CX6RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

$(document).ready(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            $(".my-btn").on('click',async(e)=>{

                const dbref = doc(db, "carts", user.email);

                const docsnap = await getDoc(dbref);
                if (!docsnap.exists()) {
                    setDoc(dbref, {items : e.target.id})
                } else {
                    updateDoc(dbref,{
                        items:arrayUnion(e.target.id)   
                    });
                }
            });

            $("#logout").click(()=>{
                signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
            });
        } else {
            alert("you are not log in");
            window.location.href="./login.html";
        }
      });

});
