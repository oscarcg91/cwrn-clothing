import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCleDlYI3jkNjp6dsdtX4wLbKhYAaeZnw0",
  authDomain: "crwn-db-79e8e.firebaseapp.com",
  projectId: "crwn-db-79e8e",
  storageBucket: "crwn-db-79e8e.appspot.com",
  messagingSenderId: "637484204193",
  appId: "1:637484204193:web:00903e7c1a3d31926f70e0",
  measurementId: "G-T0PCBXDH3D",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
