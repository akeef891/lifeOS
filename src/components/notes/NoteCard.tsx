"use client";

import { motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
  index?: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({
  note,
  index = 0,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="w-full text-left"
      onClick={() => onEdit(note.id)}
    >
      <GlassCard
        hover
        padding="md"
        className="h-full group relative"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-violet-500/10"
            aria-hidden="true"
          >
            <FileText className="h-4 w-4 text-violet-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground line-clamp-1">
                {note.title}
              </h3>
              <span className="shrink-0 text-xs text-muted">{note.updatedAt}</span>
            </div>
            <p className="mt-2 text-sm text-muted line-clamp-3">{note.excerpt}</p>
            {note.tag && (
              <span className="mt-3 inline-block rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-xs text-muted">
                {note.tag}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label="Delete note"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted opacity-0 transition-colors hover:bg-white/[0.06] hover:text-foreground hover:border-white/[0.12] focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </GlassCard>
    </motion.button>
  );
}
