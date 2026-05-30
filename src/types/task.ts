import type { Timestamp } from "firebase/firestore";

export type TaskPriority = "high" | "medium" | "low";

/** Firestore document shape under users/{uid}/tasks/{taskId}. */
export interface FirestoreTask {
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  /** Optional UI fields preserved from the existing task editor. */
  priority?: TaskPriority;
  dueDate?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

/** Task model used by UI components. */
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  progress: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  completed?: boolean;
}
