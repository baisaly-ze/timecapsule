import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDV0WpBkgX8MCodGPP3gLC_LN8hu86pa94",
  authDomain: "timecapsule-b3197.firebaseapp.com",
  projectId: "timecapsule-b3197",
  storageBucket: "timecapsule-b3197.firebasestorage.app",
  messagingSenderId: "878889274307",
  appId: "1:878889274307:web:2515ee934983863ebacb76",
  measurementId: "G-PJC74G52E6",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;