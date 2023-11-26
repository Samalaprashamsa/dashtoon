import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApd7HXLPe5CrAAU24H10qrTWFmWgPzbJo",
    authDomain: "dashtoon-6591c.firebaseapp.com",
    projectId: "dashtoon-6591c",
    storageBucket: "dashtoon-6591c.appspot.com",
    messagingSenderId: "789428405093",
    appId: "1:789428405093:web:497b59103797f26557178c",
    measurementId: "G-1EQNWDNZJT"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
