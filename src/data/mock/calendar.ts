export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  color: "violet" | "blue" | "emerald" | "amber";
}

export const mockUpcomingEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Deep work block",
    time: "9:00 AM",
    date: "May 27",
    color: "violet",
  },
  {
    id: "2",
    title: "Team standup",
    time: "11:30 AM",
    date: "May 27",
    color: "blue",
  },
  {
    id: "3",
    title: "Design review",
    time: "2:00 PM",
    date: "May 28",
    color: "emerald",
  },
  {
    id: "4",
    title: "Weekly planning",
    time: "4:30 PM",
    date: "May 29",
    color: "amber",
  },
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** May 2026 — month grid with leading/trailing days */
export function getMay2026Days(): { day: number; currentMonth: boolean; hasEvent?: boolean }[] {
  const days: { day: number; currentMonth: boolean; hasEvent?: boolean }[] = [];
  const eventDays = [3, 7, 12, 15, 22, 27, 28];

  for (let i = 26; i <= 31; i++) {
    days.push({ day: i, currentMonth: false });
  }
  for (let d = 1; d <= 31; d++) {
    days.push({
      day: d,
      currentMonth: true,
      hasEvent: eventDays.includes(d),
    });
  }
  for (let i = 1; i <= 6; i++) {
    days.push({ day: i, currentMonth: false });
  }
  return days;
}
