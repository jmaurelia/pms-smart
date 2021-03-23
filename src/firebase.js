import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyA9VZQyaSNKYPSz7-F7dNHa7bStaeS1f7c",
  authDomain: "test-bioforest-2d504.firebaseapp.com",
  databaseURL: "https://test-bioforest-2d504-default-rtdb.firebaseio.com/",
  projectId: "test-bioforest-2d504",
  storageBucket: "test-bioforest-2d504.appspot.com",
  messagingSenderId: "774713158224",
  appId: "1:774713158224:web:9d0ed295cf2441d18f7f55"
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
