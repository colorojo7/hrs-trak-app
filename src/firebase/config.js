// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS7W54MBjtUorJnfe1s4PvdlhAkSJNiXM",
  authDomain: "hrs-trak-app.firebaseapp.com",
  projectId: "hrs-trak-app",
  storageBucket: "hrs-trak-app.appspot.com",
  messagingSenderId: "187692277509",
  appId: "1:187692277509:web:2310182704663545df216c"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const initFirestore = () => app
export default db;

