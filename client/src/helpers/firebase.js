// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "../helpers/getEnv"; // Import from utility file

// Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"), // Use helper function
  authDomain: "blog-app-13562.firebaseapp.com",
  projectId: "blog-app-13562",
  storageBucket: "blog-app-13562.appspot.com",
  messagingSenderId: "226201390238",
  appId: "1:226201390238:web:9917fccec20528e38b7f8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Optional: Force account selection
provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider };
