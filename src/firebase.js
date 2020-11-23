import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDa3lXwrggng1hq6BY_QtGVucDnU-OGeEg",
  authDomain: "bioforest-smart.firebaseapp.com",
  databaseURL: "https://bioforest-smart.firebaseio.com",
  projectId: "bioforest-smart",
  storageBucket: "bioforest-smart.appspot.com",
  messagingSenderId: "782404818298",
  appId: "1:782404818298:web:2d060bc550ef663df232c3",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BJRpu-GjKckOHG1NdNHC0NY-mGPAlrcyMckFTwpyzCKFQNo15VzK638nu2PQpI95aDF5m0XxIGXT8uzO4Je6qiQ"
  );
}
// collection references
const usersCollection = db.collection("users");
// export utils/refs
export { db, auth, database, messaging, usersCollection };
