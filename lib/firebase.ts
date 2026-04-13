// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoCz84wkwJtAxyUt9LFAd7lEOODIUB_tg",
    authDomain: "ecommerce-abee2.firebaseapp.com",
    projectId: "ecommerce-abee2",
    storageBucket: "ecommerce-abee2.firebasestorage.app",
    messagingSenderId: "317546631302",
    appId: "1:317546631302:web:9feb9a178fd8fb5f6f8107",
    measurementId: "G-VMH9WGT0L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);