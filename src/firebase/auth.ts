import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseApp } from "@/firebase/config";

let authInstance: Auth | null = null;

/** Returns the singleton Firebase Auth instance. */
export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
}
