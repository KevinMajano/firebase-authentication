import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDWSGwjwGIimNOlZRYpQ6iVdvjVOwHOmRs",
    authDomain: "fir-authentication-589bf.firebaseapp.com",
    projectId: "fir-authentication-589bf",
    storageBucket: "fir-authentication-589bf.appspot.com",
    messagingSenderId: "169143845745",
    appId: "1:169143845745:web:18abf64772e3f8c43b2cd0"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);
 const auth = fire.auth()
 const store = fire.firestore()

 export {auth,store}