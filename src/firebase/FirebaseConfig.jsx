// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";;

const firebaseConfig = {
  apiKey: "AIzaSyDK-cFB5HJIW3QBBk69OlVEyiw5ECB8_Bo",
  authDomain: "fir-e9b2f.firebaseapp.com",
  projectId: "fir-e9b2f",
  storageBucket: "fir-e9b2f.firebasestorage.app",
  messagingSenderId: "622392249579",
  appId: "1:622392249579:web:400e0dd27ce97ace2e02ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yaha pe banane se hame baar baar har jagah nahi bnana pdega direct import kr ke use kar sakte hai
const firebaseDB = getFirestore(app);
const auth = getAuth(app);

export {firebaseDB, auth}
