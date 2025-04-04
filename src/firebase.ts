import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDnStTpOwWf49MvWP2cyPnbMYDaIcdyqIY",
  authDomain: "jobfair-7104f.firebaseapp.com",
  databaseURL:
    "https://jobfair-7104f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jobfair-7104f",
  storageBucket: "jobfair-7104f.firebasestorage.app",
  messagingSenderId: "607590057845",
  appId: "1:607590057845:web:256a8ed16b238a742af53c",
  measurementId: "G-BE5XW58YML",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const usersRef = ref(db, "user");
