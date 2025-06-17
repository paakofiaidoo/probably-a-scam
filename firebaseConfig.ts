
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const env = (import.meta as any).env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let firebaseInitializationAttempted = false;

try {
  // Check if essential Firebase environment variables are set
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error(
      "CRITICAL: Firebase configuration environment variables (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID) are missing or invalid from import.meta.env. " +
      "The application will NOT be able to save submissions or interact with Firebase. " +
      "Please ensure these environment variables are set correctly with the VITE_ prefix in your .env file."
    );
    // Do not throw here to allow the app to load for UI/other non-Firebase testing.
    // Firebase services will not be available.
  } else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully using Vite environment variables (import.meta.env).");
  }
  firebaseInitializationAttempted = true;
} catch (error) {
  console.error("Error during Firebase initialization attempt:", error);
  // Check if initialization was already attempted and if critical env vars are still missing
  if (!firebaseInitializationAttempted && (!firebaseConfig.apiKey || !firebaseConfig.projectId)) {
    console.error(
      "Firebase initialization failed. This is very likely because essential Firebase environment variables (e.g., VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID) are not set in import.meta.env. " +
      "Please set these environment variables with the VITE_ prefix in your .env file for Firebase services to work."
    );
  }
  // Do not re-throw the error here to prevent app crash.
  // The `db` object will remain undefined, and services using it should handle this.
}

// Export `app` and `db`. They will be undefined if initialization failed.
// Services using `db` (like firestoreService.ts) should have checks for `!db`.
export { app, db };