import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import '@firebase/storage';
/*
import {connectFirestoreEmulator} from "firebase/firestore";
import {connectStorageEmulator} from "firebase/storage";
*/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfRdSbtai1wPp3zH5IxsiEwGVQxDTZl9A",
    authDomain: "mahasawas-healthapp.firebaseapp.com",
    projectId: "mahasawas-healthapp",
    storageBucket: "mahasawas-healthapp.appspot.com",
    messagingSenderId: "1068722292825",
    appId: "1:1068722292825:web:ca4d3d554106a773824948",
    measurementId: "G-BGTHFT709K"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

/*
if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost', 9199)
}

*/
export {
    storage,
    db,
}