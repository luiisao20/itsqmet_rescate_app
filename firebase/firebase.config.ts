import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase.sdk";
import AsyncStorage from '@react-native-async-storage/async-storage';

const app: FirebaseApp = initializeApp(firebaseConfig);

let auth: Auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: AsyncStorage as any,
  });
}

const db: Firestore = getFirestore(app);

export { app, auth, db };
