import type { Timestamp } from "firebase/firestore";

/** Firestore document shape under users/{uid}/notes/{noteId}. */
export interface FirestoreNote {
  userId: string;
  title: string;
  content: string;
  /** Optional tag preserved for the existing notes UI. */
  tag?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

/** Note model used by UI components. */
export interface Note {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  tag?: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  tag?: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  tag?: string;
}
