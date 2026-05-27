"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  placeholderConversation,
  suggestedPrompts,
  type ChatMessage,
} from "@/data/mock/assistant";
import { cn } from "@/lib/utils";

export function AssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>(placeholderConversation);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  const assistantReply = useMemo(() => {
    const generate = (prompt: string) => {
      const p = prompt.toLowerCase();

      if (p.includes("plan") || p.includes("focus")) {
        return (
          "Here’s a quick plan:\n" +
          "1) Pick your top outcome (one sentence)\n" +
          "2) Block 2–3 focus sessions (25–50 min)\n" +
          "3) Add one small admin task to keep momentum\n" +
          "4) End with a 5-minute review\n\n" +
          "Want me to tailor this to your available time?"
        );
      }

      if (p.includes("priorit")) {
        return (
          "Prioritization in 60 seconds:\n" +
          "- Impact: what moves the needle?\n" +
          "- Urgency: what’s time-sensitive?\n" +
          "- Effort: what’s quickest to unlock progress?\n\n" +
          "If you paste your task list, I’ll rank it."
        );
      }

      if (p.includes("routine") || p.includes("morning")) {
        return (
          "Morning routine suggestion:\n" +
          "- 2 min: set intention for the day\n" +
          "- 10 min: deep focus (single task)\n" +
          "- 5 min: quick review + next action\n" +
          "- 1 small win before email\n\n" +
          "Do you prefer a calm start or a high-energy start?"
        );
      }

      if (p.includes("summarize") || p.includes("summary") || p.includes("notes")) {
        return (
          "Summary mode:\n" +
          "- Key points: (1) ... (2) ...\n" +
          "- Decisions: ...\n" +
          "- Next actions: ...\n\n" +
          "Send the text you want summarized and I’ll structure it."
        );
      }

      return (
        "Got it. I can help you plan, prioritize, or turn ideas into clear next steps.\n\n" +
        "What’s your primary goal right now?"
      );
    };

    return generate;
  }, []);

  function createId(prefix: string) {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: createId("msg"),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: createId("msg"),
        role: "assistant",
        content: assistantReply(trimmed),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900 + Math.floor(Math.random() * 600));
  };

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Intelligence"
        title="AI Assistant"
        description="Plan your day, prioritize tasks, and think through goals."
      />

      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={prompt}
            type="button"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => sendMessage(prompt)}
            className={cn(
              "rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-muted",
              "transition-colors hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-foreground"
            )}
          >
            {prompt}
          </motion.button>
        ))}
      </div>

      <GlassCard padding="none" className="flex min-h-[420px] flex-col overflow-hidden sm:min-h-[480px]">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                {msg.role === "assistant" && (
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/20"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-4 w-4 text-violet-400" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
                    msg.role === "assistant"
                      ? "border border-white/[0.08] bg-white/[0.04] text-foreground"
                      : "bg-violet-600 text-white"
                  )}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3"
                aria-live="polite"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/20"
                  aria-hidden="true"
                >
                  <Sparkles className="h-4 w-4 text-violet-400" />
                </div>
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-foreground sm:max-w-[75%]">
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-violet-400"
                      aria-hidden="true"
                    />
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: 0.15,
                      }}
                      className="h-2 w-2 rounded-full bg-violet-400"
                      aria-hidden="true"
                    />
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                      className="h-2 w-2 rounded-full bg-violet-400"
                      aria-hidden="true"
                    />
                    <span className="sr-only">AI is typing</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/[0.06] p-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <label className="sr-only" htmlFor="assistant-input">
              Message
            </label>
            <input
              id="assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your day..."
              className={cn(
                "h-10 min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-foreground",
                "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              )}
            />
            <Button
              type="submit"
              aria-label="Send message"
              disabled={isTyping || input.trim().length === 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
