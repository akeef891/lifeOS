"use client";

import { useEffect, useState } from "react";
import { FileText, Pencil, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NoteDraft = {
  title: string;
  excerpt: string;
  tag?: string;
};

interface NoteEditorModalProps {
  open: boolean;
  onClose: () => void;
  initial?: NoteDraft;
  mode?: "create" | "edit";
  onSave: (draft: NoteDraft) => void;
}

export function NoteEditorModal({
  open,
  onClose,
  initial,
  mode = "create",
  onSave,
}: NoteEditorModalProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? "");
    setExcerpt(initial?.excerpt ?? "");
    setTag(initial?.tag ?? "");
  }, [open, initial]);

  const canSave = title.trim().length > 0 && excerpt.trim().length > 0;

  const icon =
    mode === "edit" ? (
      <Pencil className="h-4 w-4" aria-hidden="true" />
    ) : (
      <Plus className="h-4 w-4" aria-hidden="true" />
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit note" : "Create note"}
      description="Your note is saved securely to your LifeOS account."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!canSave) return;
              onSave({
                title: title.trim(),
                excerpt: excerpt.trim(),
                tag: tag.trim() || undefined,
              });
              onClose();
            }}
            disabled={!canSave}
          >
            {icon}
            {mode === "edit" ? "Save changes" : "Create note"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
            aria-hidden="true"
          >
            <FileText className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {mode === "edit" ? "Keep it concise" : "Capture an idea"}
            </p>
            <p className="text-xs text-muted">
              Short title + a clear excerpt works best.
            </p>
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-muted">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q2 product vision"
            className={cn(
              "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            )}
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted">Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary you can scan later..."
            className={cn(
              "mt-1 min-h-24 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            )}
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted">Tag (optional)</span>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Product, Personal, AI..."
            className={cn(
              "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            )}
          />
        </label>
      </div>
    </Modal>
  );
}

