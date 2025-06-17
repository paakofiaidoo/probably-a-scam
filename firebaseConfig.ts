
// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration sourced from environment variables
// Ensure these are defined in your environment (e.g., .env file for local development, or server environment variables).
// Example:
// FIREBASE_API_KEY=your_api_key
// FIREBASE_PROJECT_ID=your_project_id
// etc.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let firebaseInitializationAttempted = false;

try {
  // Check if essential Firebase environment variables are set
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error(
      "CRITICAL: Firebase configuration environment variables (FIREBASE_API_KEY, FIREBASE_PROJECT_ID) are missing or invalid. " +
      "The application will NOT be able to save submissions or interact with Firebase. " +
      "Please ensure these environment variables are set correctly in your build/runtime environment."
    );
    // Do not throw here to allow the app to load for UI/other non-Firebase testing.
    // Firebase services will not be available.
  } else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully using environment variables.");
  }
  firebaseInitializationAttempted = true;
} catch (error) {
  console.error("Error during Firebase initialization attempt:", error);
  if (!firebaseInitializationAttempted && (!firebaseConfig.apiKey || !firebaseConfig.projectId)) {
    // This specific error is likely due to the missing env vars, reiterate the core issue.
    console.error(
      "Firebase initialization failed. This is very likely because essential Firebase environment variables (e.g., FIREBASE_API_KEY, FIREBASE_PROJECT_ID) are not set. " +
      "Please set these environment variables for Firebase services to work."
    );
  }
  // Do not re-throw the error here to prevent app crash.
  // The `db` object will remain undefined, and services using it should handle this.
}

// Export `app` and `db`. They will be undefined if initialization failed or used placeholders.
// Services using `db` (like firestoreService.ts) should have checks for `!db`.
export { app, db };
