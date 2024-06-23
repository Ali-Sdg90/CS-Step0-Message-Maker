import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCY7VXFXBgh9yBbiEFStXN7tWo_TYnkjwU",
    authDomain: "cs-step0-message-maker.firebaseapp.com",
    projectId: "cs-step0-message-maker",
    storageBucket: "cs-step0-message-maker.appspot.com",
    messagingSenderId: "882735040274",
    appId: "1:882735040274:web:09ef36d4e43651f3e615cb",
    measurementId: "G-CYNFH29FD6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
