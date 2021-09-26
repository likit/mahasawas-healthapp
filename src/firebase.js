import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCy-GU37EF62Xaajdb1nAw4ImteoZncgns",
    authDomain: "uberhealth-c1541.firebaseapp.com",
    projectId: "uberhealth-c1541",
    storageBucket: "uberhealth-c1541.appspot.com",
    messagingSenderId: "115846268061",
    appId: "1:115846268061:web:1d7194ac88891247298074",
    measurementId: "G-CV6PH30VEE"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const storage = firebase.storage()

export {
    firebase as fb,
    storage,
    db,
}