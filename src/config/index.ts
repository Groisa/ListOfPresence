// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4N0unZKVkAeBIThIjc1rPQs7KwV47z48",
    authDomain: "listofpresence.firebaseapp.com",
    projectId: "listofpresence",
    storageBucket: "listofpresence.appspot.com",
    messagingSenderId: "828112079578",
    appId: "1:828112079578:web:f430f90ffd5535775f33e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);