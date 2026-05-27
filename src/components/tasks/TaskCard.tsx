"use client";

import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Task } from "@/data/mock/tasks";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  index?: number;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({
  task,
  index = 0,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <GlassCard
        hover
        padding="md"
        className={cn(task.completed && "opacity-70", "group")}
      >
        <div className="flex gap-3">
          <button
            type="button"
            aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
            onClick={() => onToggleComplete(task.id)}
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
              task.completed
                ? "border-violet-500/50 bg-violet-500/20 text-violet-300"
                : "border-white/[0.12] hover:border-violet-500/40"
            )}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={cn(
                  "text-sm font-medium text-foreground",
                  task.completed && "line-through text-muted"
                )}
              >
                {task.title}
              </h3>
              <Badge variant={task.priority}>{task.priority}</Badge>
            </div>
            {task.description && (
              <p className="mt-1 text-sm text-muted line-clamp-2">{task.description}</p>
            )}
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted">
              <span>Due {task.dueDate}</span>
              <span>{task.progress}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Delete task"
            onClick={() => onDelete(task.id)}
            className={cn(
              "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted",
              "transition-colors hover:text-foreground hover:bg-white/[0.06] hover:border-white/[0.12]",
              "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            )}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
