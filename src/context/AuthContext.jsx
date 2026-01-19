import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, googleProvider, setupRecaptcha } from "../firebase";
import { api } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // GOOGLE
  const loginWithGoogle = async (intendedRole = 'student') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Sync with backend to get/create user and role
      const dbUser = await api.syncFirebaseUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: intendedRole
      });

      setUser({ ...dbUser, ...firebaseUser }); // Merge Firebase auth + DB role
      return dbUser;
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  };

  // PHONE
  const loginWithPhone = async (phoneNumber) => {
    try {
      const verifier = setupRecaptcha("recaptcha-container");
      if (!verifier) throw new Error("Recaptcha verification failed to initialize");

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      return confirmation;
    } catch (error) {
      // If recaptcha fails (e.g., rendered already), try clearing and retrying once
      if (error.message.includes("app-verification")) {
        console.warn("Retrying Recaptcha...");
        window.recaptchaVerifier = null;
        const retryVerifier = setupRecaptcha("recaptcha-container");
        return await signInWithPhoneNumber(auth, phoneNumber, retryVerifier);
      }
      throw error;
    }
  };

  const verifyOTP = async (confirmation, otp, intendedRole = 'student') => {
    try {
      const result = await confirmation.confirm(otp);
      const firebaseUser = result.user;

      // Sync with backend
      const dbUser = await api.syncFirebaseUser({
        uid: firebaseUser.uid,
        phoneNumber: firebaseUser.phoneNumber,
        role: intendedRole
      });

      setUser({ ...dbUser, ...firebaseUser });
      return dbUser;
    } catch (error) {
      console.error("OTP Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('token'); // Clear backend token if any
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Silent sync on reload to get role
          const dbUser = await api.syncFirebaseUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          });
          setUser({ ...dbUser, ...firebaseUser });
        } catch (err) {
          console.error("Session Sync Failed:", err);
          // Fallback to just firebase user if backend fails (limited access)
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, loginWithPhone, verifyOTP, logout, isAuthenticated: !!user, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
