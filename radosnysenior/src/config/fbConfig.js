import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCu_gcwP_of1I7PqHuzDbTIP4xcToMPIIg",
    authDomain: "radosny-senior.firebaseapp.com",
    databaseURL: "https://radosny-senior.firebaseio.com",
    projectId: "radosny-senior",
    storageBucket: "radosny-senior.appspot.com",
    messagingSenderId: "707502575274"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase