import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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

$(document).ready(()=>{
    $("#signup").click(()=>{
        $("#err").empty();
        var email = $("#email").val();
        var password = $("#password").val();

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.href="./mainshop.html";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            $("#err").append(errorMessage);
        });
    })
})