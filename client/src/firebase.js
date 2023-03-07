// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWJ2Ae2UK85cYmLRG1x3g5ys3360lu84o",
  authDomain: "ecommerce-b7fb3.firebaseapp.com",
  projectId: "ecommerce-b7fb3",
  storageBucket: "ecommerce-b7fb3.appspot.com",
  messagingSenderId: "599298254044",
  appId: "1:599298254044:web:002d9c0fd9760910a74019"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app