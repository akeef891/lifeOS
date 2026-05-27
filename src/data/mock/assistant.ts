export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const suggestedPrompts = [
  "Plan my focus blocks for today",
  "Summarize my open tasks",
  "Help me prioritize this week",
  "Draft a morning routine",
];

export const placeholderConversation: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi — I'm your LifeOS assistant. Ask me to plan your day, break down goals, or draft notes. What would you like to work on?",
  },
];
