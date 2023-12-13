import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDLrv46Qg0ZH8MdZwB4PrJ09CSJFCdgZ_Q",
    authDomain: "tecnoshop-12685.firebaseapp.com",
    projectId: "tecnoshop-12685",
    storageBucket: "tecnoshop-12685.appspot.com",
    messagingSenderId: "418961500468",
    appId: "1:418961500468:web:e947af76e8a987f1979d61",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

export { auth, firestore, storage };
