

import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, doc, getDocs, addDoc, setDoc, updateDoc, query, orderBy } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// console.log(process.env)


const clientCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

const app = initializeApp(clientCredentials)
const firestore = getFirestore(app)
const auth = getAuth(app)

export {firestore, auth, collection, doc, getDocs, addDoc, setDoc, updateDoc, query, orderBy }