import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCb2nUuX7e2ESIMk2-bibxdGDVfeLfjKfA",
  authDomain: "test-bioforest.firebaseapp.com",
  databaseURL: "https://test-bioforest.firebaseio.com",
  projectId: "test-bioforest",
  storageBucket: "test-bioforest.appspot.com",
  messagingSenderId: "1008814743830",
  appId: "1:1008814743830:web:5a258d33f048d84113f037"
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
const logsCollection = db.collection("logs");
// export utils/refs
export { db, auth, database, messaging, usersCollection, logsCollection };
