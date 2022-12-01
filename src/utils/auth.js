// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjm23rmDxJUkLUFi87k3Wvay_X1v4unmQ",
    authDomain: "codecoster-f3756.firebaseapp.com",
    databaseURL: "https://codecoster-f3756-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codecoster-f3756",
    storageBucket: "codecoster-f3756.appspot.com",
    messagingSenderId: "570975178139",
    appId: "1:570975178139:web:0d08d7b12ce36c6ed4253e",
    measurementId: "G-86G0SJH4G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };