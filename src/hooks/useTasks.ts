"use client";

import { useTasksNotesContext } from "@/context/TasksNotesContext";

/** Tasks state and CRUD actions backed by Firestore. */
export function useTasks() {
  const {
    tasks,
    tasksLoading,
    tasksError,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasksNotesContext();

  return {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
