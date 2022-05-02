import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCyVPwOZq2W9e2vYDAzFa7D_13GqSOKlKY",
    authDomain: "nextfire-ab38b.firebaseapp.com",
    projectId: "nextfire-ab38b",
    storageBucket: "nextfire-ab38b.appspot.com",
    messagingSenderId: "1026956759596",
    appId: "1:1026956759596:web:0e24da1022f80b79697789",
    measurementId: "G-ELKHG8HH9R"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;



// Gets a user/{uid} document with username 
// @param {string} username

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

// converts a firestore document to JSON 
// @param {DocumentSnapShot} doc  

export function postToJSON(doc) {

  const data = doc.data();
  return {
    ...data,
    // gotcha! firestore timestamp not serializable to json.  must convert to miilliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;