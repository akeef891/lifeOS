"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  createNote as createNoteDoc,
  deleteNote as deleteNoteDoc,
  subscribeToUserNotes,
  updateNote as updateNoteDoc,
} from "@/services/noteService";
import {
  createTask as createTaskDoc,
  deleteTask as deleteTaskDoc,
  subscribeToUserTasks,
  toggleTaskComplete,
  updateTask as updateTaskDoc,
} from "@/services/taskService";
import type { CreateNoteInput, Note, UpdateNoteInput } from "@/types/note";
import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";
import { getFirestoreErrorMessage } from "@/utils/firestoreErrors";

interface TasksNotesContextValue {
  tasks: Task[];
  notes: Note[];
  tasksLoading: boolean;
  notesLoading: boolean;
  tasksError: string | null;
  notesError: string | null;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (taskId: string, input: UpdateTaskInput) => Promise<void>;
  toggleTask: (taskId: string, completed: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  createNote: (input: CreateNoteInput) => Promise<void>;
  updateNote: (noteId: string, input: UpdateNoteInput) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
}

const TasksNotesContext = createContext<TasksNotesContextValue | undefined>(
  undefined
);

interface TasksNotesProviderProps {
  children: ReactNode;
}

/**
 * Single real-time Firestore subscription for tasks and notes per user.
 * Shared across dashboard, search, and module pages to avoid duplicate listeners.
 */
export function TasksNotesProvider({ children }: TasksNotesProviderProps) {
  const { user } = useAuth();
  const userId = user?.uid ?? null;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setNotes([]);
      setTasksLoading(false);
      setNotesLoading(false);
      setTasksError(null);
      setNotesError(null);
      return;
    }

    setTasksLoading(true);
    setNotesLoading(true);

    const unsubscribeTasks = subscribeToUserTasks(
      userId,
      (nextTasks) => {
        setTasks(nextTasks);
        setTasksLoading(false);
        setTasksError(null);
      },
      (error) => {
        setTasksError(getFirestoreErrorMessage(error));
        setTasksLoading(false);
      }
    );

    const unsubscribeNotes = subscribeToUserNotes(
      userId,
      (nextNotes) => {
        setNotes(nextNotes);
        setNotesLoading(false);
        setNotesError(null);
      },
      (error) => {
        setNotesError(getFirestoreErrorMessage(error));
        setNotesLoading(false);
      }
    );

    return () => {
      unsubscribeTasks();
      unsubscribeNotes();
    };
  }, [userId]);

  const ensureUserId = useCallback(() => {
    if (!userId) {
      throw new Error("You must be signed in to manage tasks and notes.");
    }
    return userId;
  }, [userId]);

  const createTask = useCallback(
    async (input: CreateTaskInput) => {
      await createTaskDoc(ensureUserId(), input);
    },
    [ensureUserId]
  );

  const updateTask = useCallback(
    async (taskId: string, input: UpdateTaskInput) => {
      await updateTaskDoc(ensureUserId(), taskId, input);
    },
    [ensureUserId]
  );

  const toggleTask = useCallback(
    async (taskId: string, completed: boolean) => {
      await toggleTaskComplete(ensureUserId(), taskId, completed);
    },
    [ensureUserId]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      await deleteTaskDoc(ensureUserId(), taskId);
    },
    [ensureUserId]
  );

  const createNote = useCallback(
    async (input: CreateNoteInput) => {
      await createNoteDoc(ensureUserId(), input);
    },
    [ensureUserId]
  );

  const updateNote = useCallback(
    async (noteId: string, input: UpdateNoteInput) => {
      await updateNoteDoc(ensureUserId(), noteId, input);
    },
    [ensureUserId]
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      await deleteNoteDoc(ensureUserId(), noteId);
    },
    [ensureUserId]
  );

  const value = useMemo<TasksNotesContextValue>(
    () => ({
      tasks,
      notes,
      tasksLoading,
      notesLoading,
      tasksError,
      notesError,
      createTask,
      updateTask,
      toggleTask,
      deleteTask,
      createNote,
      updateNote,
      deleteNote,
    }),
    [
      tasks,
      notes,
      tasksLoading,
      notesLoading,
      tasksError,
      notesError,
      createTask,
      updateTask,
      toggleTask,
      deleteTask,
      createNote,
      updateNote,
      deleteNote,
    ]
  );

  return (
    <TasksNotesContext.Provider value={value}>{children}</TasksNotesContext.Provider>
  );
}

export function useTasksNotesContext(): TasksNotesContextValue {
  const context = useContext(TasksNotesContext);
  if (!context) {
    throw new Error("useTasksNotes must be used within TasksNotesProvider");
  }
  return context;
}
