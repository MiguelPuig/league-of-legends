import firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC34kaQ7NAmVJKsmiWIZuaWWpcVUDnvTyA",
  authDomain: "lolapp-chat.firebaseapp.com",
  databaseURL: "https://lolapp-chat.firebaseio.com",
  projectId: "lolapp-chat",
  storageBucket: "lolapp-chat.appspot.com",
  messagingSenderId: "425904053617",
  appId: "1:425904053617:web:22f8558c246555552b2ad0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase;

export default db;
