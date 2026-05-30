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
import type {
  CreateTaskInput,
  Task,
  TaskPriority,
  UpdateTaskInput,
} from "@/types/task";

const TASKS_SUBCOLLECTION = "tasks";

function tasksCollection(userId: string) {
  return collection(getFirestoreDb(), "users", userId, TASKS_SUBCOLLECTION);
}

function mapTaskDoc(snapshot: QueryDocumentSnapshot<DocumentData>): Task {
  const data = snapshot.data();

  const completed = Boolean(data.completed);
  const priority = (data.priority as TaskPriority | undefined) ?? "medium";

  return {
    id: snapshot.id,
    title: data.title ?? "",
    description: data.description || undefined,
    priority,
    dueDate: data.dueDate ?? "Today",
    completed,
    progress: completed ? 100 : Number(data.progress ?? 0),
  };
}

function getUpdatedAtMillis(docSnap: QueryDocumentSnapshot<DocumentData>): number {
  const updatedAt = docSnap.data().updatedAt;
  if (updatedAt && typeof updatedAt.toMillis === "function") {
    return updatedAt.toMillis();
  }
  return 0;
}

function mapAndSortTaskDocs(docs: QueryDocumentSnapshot<DocumentData>[]): Task[] {
  return [...docs]
    .sort((a, b) => getUpdatedAtMillis(b) - getUpdatedAtMillis(a))
    .map(mapTaskDoc);
}

/**
 * Real-time listener for the signed-in user's tasks.
 * Filters by userId so Firestore security rules allow the query.
 */
export function subscribeToUserTasks(
  userId: string,
  onData: (tasks: Task[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const baseCollection = tasksCollection(userId);

  // Primary query: userId filter + updatedAt sort (requires composite index once deployed)
  const indexedQuery = query(
    baseCollection,
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  // Fallback query if composite index is not created yet
  const fallbackQuery = query(baseCollection, where("userId", "==", userId));

  let unsubscribe = onSnapshot(
    indexedQuery,
    (snapshot) => {
      onData(snapshot.docs.map(mapTaskDoc));
    },
    (error) => {
      const code = (error as { code?: string }).code;
      if (code === "failed-precondition") {
        unsubscribe();
        unsubscribe = onSnapshot(
          fallbackQuery,
          (snapshot) => {
            onData(mapAndSortTaskDocs(snapshot.docs));
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

/** Creates a new task for the authenticated user. */
export async function createTask(
  userId: string,
  input: CreateTaskInput
): Promise<string> {
  const docRef = await addDoc(tasksCollection(userId), {
    userId,
    title: input.title,
    description: input.description ?? "",
    completed: false,
    priority: input.priority,
    dueDate: input.dueDate,
    progress: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/** Updates task fields for the authenticated user. */
export async function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput
): Promise<void> {
  const taskRef = doc(getFirestoreDb(), "users", userId, TASKS_SUBCOLLECTION, taskId);

  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.title !== undefined) payload.title = input.title;
  if (input.description !== undefined) payload.description = input.description;
  if (input.priority !== undefined) payload.priority = input.priority;
  if (input.dueDate !== undefined) payload.dueDate = input.dueDate;

  if (input.completed !== undefined) {
    payload.completed = input.completed;
    payload.progress = input.completed ? 100 : 0;
  }

  await updateDoc(taskRef, payload);
}

/** Toggles a task between complete and incomplete. */
export async function toggleTaskComplete(
  userId: string,
  taskId: string,
  completed: boolean
): Promise<void> {
  await updateTask(userId, taskId, { completed });
}

/** Deletes a task belonging to the authenticated user. */
export async function deleteTask(userId: string, taskId: string): Promise<void> {
  const taskRef = doc(getFirestoreDb(), "users", userId, TASKS_SUBCOLLECTION, taskId);
  await deleteDoc(taskRef);
}
