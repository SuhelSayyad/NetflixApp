// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAzemwWeW_9s-pxvmruoeKy7ekaHd-58io",
  authDomain: "netflixemailpaogin.firebaseapp.com",
  projectId: "netflixemailpaogin",
  storageBucket: "netflixemailpaogin.appspot.com",
  messagingSenderId: "834159458406",
  appId: "1:834159458406:web:3f529042226be52898d5a7",
  measurementId: "G-62N1XQJTYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getAuth(app)