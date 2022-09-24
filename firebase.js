// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();

// export { db,auth, provider };
export { db, auth };
