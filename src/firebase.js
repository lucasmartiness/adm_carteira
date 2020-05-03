import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD49GnV25MVPCggX6231YaJWI777nZZnbI",
  authDomain: "app-carteira-inv.firebaseapp.com",
  databaseURL: "https://app-carteira-inv.firebaseio.com",
  projectId: "app-carteira-inv",
  storageBucket: "app-carteira-inv.appspot.com",
  messagingSenderId: "178456734181",
  appId: "1:178456734181:web:14b6909faa43c59338a70c"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore()
// db.settings({timestampsInSnapshots:true})

export default firebase