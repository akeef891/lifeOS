import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/firebase/auth";
import { createUserProfile } from "@/services/userService";
import type { LoginInput, RegisterInput } from "@/types/auth";

/** Registers a new user with email/password and creates their Firestore profile. */
export async function registerWithEmail(input: RegisterInput): Promise<User> {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    input.email.trim(),
    input.password
  );

  const user = credential.user;

  // Keep Firebase Auth display name in sync with Firestore profile name.
  await updateProfile(user, { displayName: input.name.trim() });

  await createUserProfile({
    uid: user.uid,
    name: input.name.trim(),
    email: input.email.trim(),
  });

  return user;
}

/** Signs in an existing user with email/password. */
export async function loginWithEmail(input: LoginInput): Promise<User> {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(
    auth,
    input.email.trim(),
    input.password
  );
  return credential.user;
}

/** Signs out the current authenticated user. */
export async function logoutUser(): Promise<void> {
  const auth = getFirebaseAuth();
  await signOut(auth);
}
