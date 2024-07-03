// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2MgR6coAk4V7drZ-xl134bEeASFi8eFE",
  authDomain: "myburgerapp-7e6fd.firebaseapp.com",
  databaseURL: "https://myburgerapp-7e6fd-default-rtdb.firebaseio.com",
  projectId: "myburgerapp-7e6fd",
  storageBucket: "myburgerapp-7e6fd.appspot.com",
  messagingSenderId: "467897717076",
  appId: "1:467897717076:web:790f55700996a521d078c1",
  measurementId: "G-46WNYXZYZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {app,auth};