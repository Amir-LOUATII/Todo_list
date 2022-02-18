import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHdLQzu5A_4Tp0hzQKEBNlJMchuXs6et8",
  authDomain: "todo-list-b18d0.firebaseapp.com",
  projectId: "todo-list-b18d0",
  storageBucket: "todo-list-b18d0.appspot.com",
  messagingSenderId: "1006736588791",
  appId: "1:1006736588791:web:121220a1990999d0e738f2",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// init services
const db = firebase.firestore();

export default db;
