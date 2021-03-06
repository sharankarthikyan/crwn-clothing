import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDp8CJmhc8NKlV2CWvHlqG5esaJiEGPf0Y',
  authDomain: 'crwn-db-sharan.firebaseapp.com',
  projectId: 'crwn-db-sharan',
  storageBucket: 'crwn-db-sharan.appspot.com',
  messagingSenderId: '80697318779',
  appId: '1:80697318779:web:07910b526fdc743d9171de',
  measurementId: 'G-1ZE8M3FZS3',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
