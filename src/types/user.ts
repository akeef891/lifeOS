/** Firestore user document stored in the `users` collection. */
export interface FirestoreUser {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
}

/** Payload used when creating a user profile after registration. */
export interface CreateUserProfileInput {
  uid: string;
  name: string;
  email: string;
}
