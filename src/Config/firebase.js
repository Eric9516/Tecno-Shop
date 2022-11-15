import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcgP5VShapPiXUfkPX8Qpv27Sjvsw1x6k",
    authDomain: "curso-react-bd31f.firebaseapp.com",
    projectId: "curso-react-bd31f",
    storageBucket: "curso-react-bd31f.appspot.com",
    messagingSenderId: "918782538428",
    appId: "1:918782538428:web:50674ef7ccad6dce2196b9",
};
firebase.initializeApp(firebaseConfig);
firebase.auth = firebase.auth();

export default firebase;
