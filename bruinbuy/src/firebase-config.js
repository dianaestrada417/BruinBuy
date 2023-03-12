import { initializeApp } from "firebase/app";
import {getStorage, getRef} from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhgKNzRyWb5C4S-m8pzsFu1c3nLLwOchI",
    authDomain: "bruinbuy-62dfe.firebaseapp.com",
    projectId: "bruinbuy-62dfe",
    storageBucket: "bruinbuy-62dfe.appspot.com",
    messagingSenderId: "172990838331",
    appId: "1:172990838331:web:52af9c82310d83a0450e1e",
    measurementId: "G-77H5X4WMQ6"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const storage = getStorage(app);