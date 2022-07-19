// v9 compat packages are API compatible with v8 code
import { initializeApp } from "firebase/app";
// import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBgrFj2yY1JY4f6yLtFH7GVxR3QfozfR50",
    authDomain: "todo-web-82186.firebaseapp.com",
    projectId: "todo-web-82186",
    storageBucket: "todo-web-82186.appspot.com",
    messagingSenderId: "821924993390",
    appId: "1:821924993390:web:17a35bf99fc221f208c97f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { db, auth };
