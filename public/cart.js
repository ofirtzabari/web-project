import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, updateDoc, doc, arrayUnion, getDoc, setDoc, deleteDoc  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
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

const products = ['River', 'Bridge', 'Forest','Snowy Mountains','Beach','Car In The City','End Of The Road'
,'Red Riding Hood','Lights In The Fog','Jeep','Wild West','Helmet Is Good','Hot Asphalt','Rome','Highway'];
const prices = [10000, 5671, 4000,7000,5000,70000,40000,30000,20000,40000,15000,10000,20000,15000,50000];

$(document).ready(()=>{
    onAuthStateChanged(auth, async(user) => {
        if (user) {

            const uid = user.uid;

                const dpref = doc(db, "carts", user.email);
                const docsnap = await getDoc(dpref);
                if (!docsnap.exists()) {
                    $("#list").append("<p> the cart is empty </p>");
                    $("#sum").empty();
                } else {
                    
                    const items = docsnap.data().items;
                    var sum = 0;
                    for (let i=0; i<items.length; i++){
                        console.log(items[i]);
                        $("#list").append(`<p> ${products[items[i]-1]}  :  ${prices[items[i]-1]}$ </p>`);
                        sum += prices[items[i]-1]
                    }
                    $("#sum").append(sum + "$");

                    $("#pay").on('click', async()=>{
                        await deleteDoc(dpref);
                        console.log("seccessful deleted");
                        $("#list").empty();
                        $("#sum").empty();
                        $("#list").append("<p> Thank You For Your purchase </p>")
                    });
    
                    $("#remove").on('click', async()=>{
                        await deleteDoc(dpref);
                        console.log("seccessful deleted");
                        $("#list").empty();
                        $("#sum").empty();
                    });
                }

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


