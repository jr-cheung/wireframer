import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAmZSMRhZrAoj4kWOJqh12n330LZARmzd0",
    authDomain: "wireframer-rrf.firebaseapp.com",
    databaseURL: "https://wireframer-rrf.firebaseio.com",
    projectId: "wireframer-rrf",
    storageBucket: "wireframer-rrf.appspot.com",
    messagingSenderId: "23418334502",
    appId: "1:23418334502:web:a3f4001d9a38e4d4b7a5e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;