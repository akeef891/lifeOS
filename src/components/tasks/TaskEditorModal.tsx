"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskEditorPayload {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
}

interface TaskEditorModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: TaskEditorPayload) => void;
}

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function TaskEditorModal({
  open,
  onClose,
  onCreate,
}: TaskEditorModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("Today");

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("Today");
  }, [open]);

  const canSave = title.trim().length > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add task"
      description="Capture what matters — you can update it later."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!canSave) return;
              onCreate({
                title: title.trim(),
                description: description.trim() || undefined,
                priority,
                dueDate: dueDate.trim() || "Today",
              });
              onClose();
            }}
            disabled={!canSave}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add task
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-muted">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Plan sprint goals"
            className={cn(
              "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            )}
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional context..."
            className={cn(
              "mt-1 min-h-24 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            )}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-muted">Due</span>
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Today, Tomorrow, Fri..."
              className={cn(
                "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
                "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              )}
            />
          </label>

          <div className="block">
            <span className="text-xs font-medium text-muted">Priority</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {priorities.map((p) => {
                const active = p.value === priority;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30",
                      active
                        ? "border-violet-500/50 bg-violet-500/15 text-foreground"
                        : "border-white/[0.08] bg-white/[0.04] text-muted hover:text-foreground"
                    )}
                    aria-pressed={active}
                  >
                    <Badge variant={p.value}>{p.label}</Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

