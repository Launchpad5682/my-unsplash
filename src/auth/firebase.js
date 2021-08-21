import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//   projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBS9f-u3jt3hMuFSwtBmLrdELZLjKRewak",
  authDomain: "my-unsplash-cd0a1.firebaseapp.com",
  projectId: "my-unsplash-cd0a1",
  storageBucket: "my-unsplash-cd0a1.appspot.com",
  messagingSenderId: "602886768638",
  appId: "1:602886768638:web:8d7a6a9628086261a0e2af",
};

// initializing the auth
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const fireDB = app.firestore();
