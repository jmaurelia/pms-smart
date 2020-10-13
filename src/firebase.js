import * as firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/database"
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDa3lXwrggng1hq6BY_QtGVucDnU-OGeEg",
    authDomain: "bioforest-smart.firebaseapp.com",
    databaseURL: "https://bioforest-smart.firebaseio.com",
    projectId: "bioforest-smart",
    storageBucket: "bioforest-smart.appspot.com",
    messagingSenderId: "782404818298",
    appId: "1:782404818298:web:2d060bc550ef663df232c3"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const database = firebase.database()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    database
}