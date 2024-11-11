// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage } from "firebase/messaging";
import { getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyADywb7w_CFowu7b3EG1fZkEMjPfVJWgQE",
  authDomain: "loteria-resultados-d5ffa.firebaseapp.com",
  projectId: "loteria-resultados-d5ffa",
  storageBucket: "loteria-resultados-d5ffa.firebasestorage.app",
  messagingSenderId: "932594919452",
  appId: "1:932594919452:web:56bf05e4f7ba621c10d7d9",
  measurementId: "G-2769ZENHX4"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the serviceexport 
export const cloudMessaging = getMessaging()


