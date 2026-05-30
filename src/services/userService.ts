import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getFirestoreDb } from "@/firebase/firestore";
import type { CreateUserProfileInput, FirestoreUser } from "@/types/user";

const USERS_COLLECTION = "users";

/** Creates a user profile document in Firestore after successful registration. */
export async function createUserProfile(
  input: CreateUserProfileInput
): Promise<void> {
  const db = getFirestoreDb();
  const userRef = doc(db, USERS_COLLECTION, input.uid);

  await setDoc(userRef, {
    uid: input.uid,
    name: input.name,
    email: input.email,
    createdAt: serverTimestamp(),
  });
}

/** Reads a user profile document from Firestore. */
export async function getUserProfile(uid: string): Promise<FirestoreUser | null> {
  const db = getFirestoreDb();
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  const createdAt =
    data.createdAt && typeof data.createdAt.toDate === "function"
      ? data.createdAt.toDate().toISOString()
      : new Date().toISOString();

  return {
    uid: data.uid,
    name: data.name,
    email: data.email,
    createdAt,
  };
}
