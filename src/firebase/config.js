import firebase from "./firebase";
import "./firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyDcjkubrEb88p9FePLc-pLK-zYV-07cVXg",
    authDomain: "react-firebase-27735.firebaseapp.com",
    databaseURL: "https://react-firebase-27735.firebaseio.com",
    projectId: "react-firebase-27735",
    storageBucket: "react-firebase-27735.appspot.com",
    messagingSenderId: "364241374334",
    appId: "1:364241374334:web:fe8c9d0b39d63bf1b79c2f",
    measurementId: "G-VQ4V3LVB0E"
};
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase;