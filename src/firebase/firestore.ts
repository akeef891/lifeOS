import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";

let firestoreInstance: Firestore | null = null;

/** Returns the singleton Firestore instance. */
export function getFirestoreDb(): Firestore {
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(getFirebaseApp());
  }
  return firestoreInstance;
}
