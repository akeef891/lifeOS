"use client";

import { useTasksNotesContext } from "@/context/TasksNotesContext";

/** Notes state and CRUD actions backed by Firestore. */
export function useNotes() {
  const {
    notes,
    notesLoading,
    notesError,
    createNote,
    updateNote,
    deleteNote,
  } = useTasksNotesContext();

  return {
    notes,
    loading: notesLoading,
    error: notesError,
    createNote,
    updateNote,
    deleteNote,
  };
}
