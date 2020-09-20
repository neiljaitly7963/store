import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7v2-9cTVI_GGu_hH7RIccJf1lmj2HSX4",
  authDomain: "store-34810.firebaseapp.com",
  databaseURL: "https://store-34810.firebaseio.com",
  projectId: "store-34810",
  storageBucket: "store-34810.appspot.com",
  messagingSenderId: "867823269162",
  appId: "1:867823269162:web:50f80075be32598a735a53",
  measurementId: "G-0VMPMC68EB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get();

  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch (error) {
      console.log('erroe createg user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};