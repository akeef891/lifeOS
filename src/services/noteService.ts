import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirestoreDb } from "@/firebase/firestore";
import { formatRelativeUpdatedAt } from "@/utils/firestoreTime";
import type { CreateNoteInput, Note, UpdateNoteInput } from "@/types/note";

const NOTES_SUBCOLLECTION = "notes";

function notesCollection(userId: string) {
  return collection(getFirestoreDb(), "users", userId, NOTES_SUBCOLLECTION);
}

function mapNoteDoc(snapshot: QueryDocumentSnapshot<DocumentData>): Note {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? "",
    excerpt: data.content ?? "",
    tag: data.tag || undefined,
    updatedAt: formatRelativeUpdatedAt(data.updatedAt),
  };
}

function getUpdatedAtMillis(docSnap: QueryDocumentSnapshot<DocumentData>): number {
  const updatedAt = docSnap.data().updatedAt;
  if (updatedAt && typeof updatedAt.toMillis === "function") {
    return updatedAt.toMillis();
  }
  return 0;
}

function mapAndSortNoteDocs(docs: QueryDocumentSnapshot<DocumentData>[]): Note[] {
  return [...docs]
    .sort((a, b) => getUpdatedAtMillis(b) - getUpdatedAtMillis(a))
    .map(mapNoteDoc);
}

/** Real-time listener for the signed-in user's notes. */
export function subscribeToUserNotes(
  userId: string,
  onData: (notes: Note[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const baseCollection = notesCollection(userId);

  const indexedQuery = query(
    baseCollection,
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  const fallbackQuery = query(baseCollection, where("userId", "==", userId));

  let unsubscribe = onSnapshot(
    indexedQuery,
    (snapshot) => {
      onData(snapshot.docs.map(mapNoteDoc));
    },
    (error) => {
      const code = (error as { code?: string }).code;
      if (code === "failed-precondition") {
        unsubscribe();
        unsubscribe = onSnapshot(
          fallbackQuery,
          (snapshot) => {
            onData(mapAndSortNoteDocs(snapshot.docs));
          },
          (fallbackError) => onError(fallbackError)
        );
        return;
      }
      onError(error);
    }
  );

  return () => unsubscribe();
}

/** Creates a new note for the authenticated user. */
export async function createNote(
  userId: string,
  input: CreateNoteInput
): Promise<string> {
  const docRef = await addDoc(notesCollection(userId), {
    userId,
    title: input.title,
    content: input.content,
    tag: input.tag ?? "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/** Updates a note for the authenticated user. */
export async function updateNote(
  userId: string,
  noteId: string,
  input: UpdateNoteInput
): Promise<void> {
  const noteRef = doc(getFirestoreDb(), "users", userId, NOTES_SUBCOLLECTION, noteId);

  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.title !== undefined) payload.title = input.title;
  if (input.content !== undefined) payload.content = input.content;
  if (input.tag !== undefined) payload.tag = input.tag;

  await updateDoc(noteRef, payload);
}

/** Deletes a note belonging to the authenticated user. */
export async function deleteNote(userId: string, noteId: string): Promise<void> {
  const noteRef = doc(getFirestoreDb(), "users", userId, NOTES_SUBCOLLECTION, noteId);
  await deleteDoc(noteRef);
}
