import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

console.log("env: ", import.meta.env.VITE_A);

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const usersRef = ref(db, "user");
