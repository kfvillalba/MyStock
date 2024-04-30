import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwlXvqVCkb1F-254kO6uqqRQ1q4KuPUh8",
  authDomain: "bd-pnotas.firebaseapp.com",
  projectId: "bd-pnotas",
  storageBucket: "bd-pnotas.appspot.com",
  messagingSenderId: "715758211826",
  appId: "1:715758211826:web:c16dd864c6dfba6dd7b66b",
  measurementId: "G-7JLCN3K639",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githutProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, githutProvider, facebookProvider };
