import { FirebaseError } from "firebase/app";

/** Maps Firebase Auth error codes to user-friendly messages. */
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.includes("Firebase is not configured")) {
    return error.message;
  }

  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and retry.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
}
