export interface Note {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  tag?: string;
}

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Q2 product vision",
    excerpt: "LifeOS should feel like a calm command center — fast, dark, and intelligent.",
    updatedAt: "2h ago",
    tag: "Product",
  },
  {
    id: "2",
    title: "Meeting notes — design sync",
    excerpt: "Glass surfaces, violet accent, generous spacing. Avoid clutter on mobile.",
    updatedAt: "Yesterday",
    tag: "Design",
  },
  {
    id: "3",
    title: "Reading list",
    excerpt: "Deep Work, Shape Up, and a few essays on focus systems.",
    updatedAt: "3d ago",
  },
  {
    id: "4",
    title: "Weekend ideas",
    excerpt: "Trail run, meal prep, and unplugged Sunday morning.",
    updatedAt: "1w ago",
    tag: "Personal",
  },
  {
    id: "5",
    title: "AI workflow experiments",
    excerpt: "Try daily planning prompt + end-of-day retrospective in assistant.",
    updatedAt: "1w ago",
    tag: "AI",
  },
  {
    id: "6",
    title: "Launch checklist",
    excerpt: "Landing page, onboarding, analytics events, error monitoring.",
    updatedAt: "2w ago",
    tag: "Product",
  },
];
