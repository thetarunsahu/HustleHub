import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

// User's latest config
const firebaseConfig = {
  apiKey: "AIzaSyBuluugkt0XWV83lRWhiHoSe8k0xxKqyFo",
  authDomain: "hustlehub-752e9.firebaseapp.com",
  projectId: "hustlehub-752e9",
  storageBucket: "hustlehub-752e9.firebasestorage.app",
  messagingSenderId: "538234514996",
  appId: "1:538234514996:web:fe2780cc728a6ae9326461",
  measurementId: "G-6GN8W4TSL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Robust Recaptcha Setup Helper
export const setupRecaptcha = (elementId = "recaptcha-container") => {
  if (!window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("reCAPTCHA expired");
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      });
    } catch (error) {
      console.error("Recaptcha Setup Error:", error);
      // Clear legacy/broken verifier if exists
      window.recaptchaVerifier = null;
    }
  }
  return window.recaptchaVerifier;
};

export default app;