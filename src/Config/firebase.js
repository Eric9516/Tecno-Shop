import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCujJbX3IyW59rWo1qmHjNhuZbNjsk4EU",
    authDomain: "laputamadre-2b90b.firebaseapp.com",
    projectId: "laputamadre-2b90b",
    storageBucket: "laputamadre-2b90b.appspot.com",
    messagingSenderId: "945932347133",
    appId: "1:945932347133:web:c282375930afdba5748094",
};
firebase.initializeApp(firebaseConfig);
firebase.auth = firebase.auth();

export default firebase;
