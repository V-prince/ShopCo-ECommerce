import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider   } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD4L8IAbB8EjJFGDW3GZwZXHSqTZI27rg0",
  authDomain: "e-commerce-35b21.firebaseapp.com",
  databaseURL: "https://e-commerce-35b21-default-rtdb.firebaseio.com",
  projectId: "e-commerce-35b21",
  storageBucket: "e-commerce-35b21.firebasestorage.app",
  messagingSenderId: "1061251808568",
  appId: "1:1061251808568:web:f69e138490ad746d7315cd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const provider2 = new FacebookAuthProvider();
export default app;