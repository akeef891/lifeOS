export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Task due today",
    message: "Review your pending tasks and prioritize the top 3.",
    time: "5m ago",
    read: false,
  },
  {
    id: "n2",
    title: "Note updated",
    message: "Your latest note was saved locally.",
    time: "1h ago",
    read: false,
  },
  {
    id: "n3",
    title: "Weekly digest ready",
    message: "You completed 42% of tasks this week. Nice progress.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n4",
    title: "Focus reminder",
    message: "Your deep work block starts in 30 minutes.",
    time: "2d ago",
    read: true,
  },
];
