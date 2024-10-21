// import { boot } from 'quasar/wrappers'

// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBUOSasEh77gc2Vt9y2l7nhO0L5eoBepuc",
  authDomain: "qweet-chat.firebaseapp.com",
  projectId: "qweet-chat",
  storageBucket: "qweet-chat.appspot.com",
  messagingSenderId: "375277551180",
  appId: "1:375277551180:web:ec0c787c2ce2ed7089bee9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default db;
