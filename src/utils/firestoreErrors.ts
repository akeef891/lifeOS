import { FirebaseError } from "firebase/app";

/** Maps Firestore / Firebase errors to user-friendly messages. */
export function getFirestoreErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        return "Firestore denied access. Publish the latest firestore.rules in Firebase Console (see docs/FIRESTORE_DEPLOY.md).";
      case "unavailable":
        return "Firestore is temporarily unavailable. Try again shortly.";
      case "not-found":
        return "The requested item was not found.";
      case "failed-precondition":
        return "Firestore index is building. Retry in a minute or deploy firestore.indexes.json.";
      default:
        return error.message || "A Firestore error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while syncing your data.";
}
