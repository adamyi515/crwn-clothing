import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAWg9MYrpXXL45FbYgGGLcBeuBysfFfUV8",
    authDomain: "crwn-db-47501.firebaseapp.com",
    projectId: "crwn-db-47501",
    storageBucket: "crwn-db-47501.appspot.com",
    messagingSenderId: "1064898840017",
    appId: "1:1064898840017:web:9097f177aef8e3390d8cf0",
    measurementId: "G-1M1ZSZL6J4"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth(); // auth
  export const firestore = firebase.firestore(); // db

  // This is the OAuth provider for google. If we had twitter or facebok, prolly firebase.auth.FacebookAuthProvider()
  const provider = new firebase.auth.GoogleAuthProvider();
  // prompt: 'select_account' is the popup that appears whenever we want to use google authentication.
  provider.setCustomParameters({
      prompt: 'select_account'
  });

  export const signInWithGoogle = () => {
      auth.signInWithPopup(provider);
  }

  export default firebase;