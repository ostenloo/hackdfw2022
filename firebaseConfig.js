import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGoIXSlUKMIHw3XTe36D7SM31iNHrOM9A",
  authDomain: "safestream-709ac.firebaseapp.com",
  projectId: "safestream-709ac",
  storageBucket: "safestream-709ac.appspot.com",
  messagingSenderId: "253553987725",
  appId: "1:253553987725:web:ccd166aff0de834dbb52c4",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);