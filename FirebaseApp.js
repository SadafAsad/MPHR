// 1. import the firebase project keys
import firebaseConfig from "./config/firebase-keys"
 
// other imports from firebase libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
// 2. instantiate the firebase app
// 3. the "export" keyword enables the firebaseApp variable to be accessible outside this file
export const firebaseApp = initializeApp(firebaseConfig);
 
// 4. @TODO: instantiate any other firebase services here
export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
