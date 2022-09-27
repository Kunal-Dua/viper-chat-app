// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPR35qMzPGte_y7YiXRQVd515uyLUhIX0",
  authDomain: "viper-chat-app.firebaseapp.com",
  projectId: "viper-chat-app",
  storageBucket: "viper-chat-app.appspot.com",
  messagingSenderId: "439208413759",
  appId: "1:439208413759:web:3fefb0b8f8a68e4e39068a",
  measurementId: "G-VNK4J0PR9F",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) 
  app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

// const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider,storage };
