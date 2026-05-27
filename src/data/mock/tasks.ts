export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  progress: number;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Ship LifeOS dashboard polish",
    description: "Finalize animations, empty states, and mobile nav.",
    priority: "high",
    dueDate: "Today",
    completed: false,
    progress: 72,
  },
  {
    id: "2",
    title: "Review weekly goals",
    description: "Align priorities for focus blocks.",
    priority: "medium",
    dueDate: "Tomorrow",
    completed: false,
    progress: 30,
  },
  {
    id: "3",
    title: "Inbox zero — personal",
    priority: "low",
    dueDate: "Fri",
    completed: true,
    progress: 100,
  },
  {
    id: "4",
    title: "Prepare AI assistant prompts",
    description: "Draft system prompts for productivity coaching.",
    priority: "medium",
    dueDate: "Sat",
    completed: false,
    progress: 15,
  },
];

export const taskProgress = {
  total: 12,
  completed: 5,
  inProgress: 4,
  percentComplete: 42,
};
