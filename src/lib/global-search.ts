import type { Note } from "@/data/mock/notes";
import type { Task } from "@/data/mock/tasks";

export interface SearchResultItem {
  id: string;
  type: "task" | "note";
  title: string;
  subtitle: string;
  href: string;
}

export function searchTasksAndNotes(
  query: string,
  tasks: Task[],
  notes: Note[],
  limit = 8
): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const taskResults: SearchResultItem[] = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        task.description?.toLowerCase().includes(q) ||
        task.dueDate.toLowerCase().includes(q) ||
        task.priority.toLowerCase().includes(q)
    )
    .map((task) => ({
      id: task.id,
      type: "task" as const,
      title: task.title,
      subtitle: task.completed
        ? "Completed"
        : `Due ${task.dueDate} · ${task.priority} priority`,
      href: "/tasks",
    }));

  const noteResults: SearchResultItem[] = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.excerpt.toLowerCase().includes(q) ||
        note.tag?.toLowerCase().includes(q)
    )
    .map((note) => ({
      id: note.id,
      type: "note" as const,
      title: note.title,
      subtitle: note.tag ? `${note.tag} · ${note.updatedAt}` : note.updatedAt,
      href: "/notes",
    }));

  return [...taskResults, ...noteResults].slice(0, limit);
}
