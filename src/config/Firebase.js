import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Initialize Firebase
var firebaseConfig = {
    apiKey: process.env.APIKEY ,
    authDomain: process.env.AUTHDOMAIN ,
    databaseURL: process.env.DATABASEURL ,
    projectId: process.env.PROJECTID ,
    storageBucket: process.env.STORAGEBUCKET ,
    messagingSenderId: process.env.MESSAGINGSENDERID ,
    appId: process.env.APPID ,
    measurementId: process.env.MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const database = getFirestore(app)
