import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbbHdRn21Oh3cKuUNTI7UPlUFOg0gLZgo",
  authDomain: "rn-uber-2f806.firebaseapp.com",
  projectId: "rn-uber-2f806",
  storageBucket: "rn-uber-2f806.appspot.com",
  messagingSenderId: "38901450081",
  appId: "1:38901450081:web:4b741d1a7731bb22993120",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;