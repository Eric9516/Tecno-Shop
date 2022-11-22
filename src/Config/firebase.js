import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgSlyVNkKhcuh4ggSEthi-wujGtx5ep2o",
    authDomain: "virtualshop-53444.firebaseapp.com",
    projectId: "virtualshop-53444",
    storageBucket: "virtualshop-53444.appspot.com",
    messagingSenderId: "931673421532",
    appId: "1:931673421532:web:927e382aeb18b15032a619",
};
firebase.initializeApp(firebaseConfig);
firebase.auth = firebase.auth();

export default firebase;
