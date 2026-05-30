"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteEditorModal } from "@/components/notes/NoteEditorModal";
import { NotesSkeleton } from "@/components/notes/NotesSkeleton";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { FirestoreErrorBanner } from "@/components/ui/FirestoreErrorBanner";
import { useNotes } from "@/hooks/useNotes";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getFirestoreErrorMessage } from "@/utils/firestoreErrors";

export function NotesView() {
  const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const editingNote = useMemo(
    () => notes.find((n) => n.id === editingNoteId) ?? null,
    [editingNoteId, notes]
  );

  const initialDraft = useMemo(() => {
    if (!editingNote) return undefined;
    return {
      title: editingNote.title,
      excerpt: editingNote.excerpt,
      tag: editingNote.tag,
    };
  }, [editingNote]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.tag?.toLowerCase().includes(q)
    );
  }, [notes, query]);

  if (loading) {
    return <NotesSkeleton />;
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Knowledge"
        title="Notes"
        description="Capture ideas, meeting notes, and references in one place."
        action={
          <Button
            onClick={() => {
              setEditorMode("create");
              setEditingNoteId(null);
              setEditorOpen(true);
            }}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create note
          </Button>
        }
      />

      {error ? <FirestoreErrorBanner message={error} /> : null}

      <label className="relative block">
        <span className="sr-only">Search notes</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className={cn(
            "h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-10 pr-4 text-base text-foreground sm:h-10 sm:text-sm",
            "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          )}
        />
      </label>

      {notes.length === 0 && query.trim().length === 0 ? (
        <EmptyState
          icon={Search}
          title="No notes yet"
          description="Create your first note. Everything is saved to your account."
          action={
            <Button
              size="sm"
              onClick={() => {
                setEditorMode("create");
                setEditingNoteId(null);
                setEditorOpen(true);
              }}
            >
              Create note
            </Button>
          }
        />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No notes found"
          description="Try a different search term or create a new note."
          action={
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button size="sm" onClick={() => setQuery("")} variant="secondary">
                Clear search
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setEditorMode("create");
                  setEditingNoteId(null);
                  setEditorOpen(true);
                }}
              >
                Create note
              </Button>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                index={index}
                onEdit={(id) => {
                  setEditorMode("edit");
                  setEditingNoteId(id);
                  setEditorOpen(true);
                }}
                onDelete={async (id) => {
                  const selected = notes.find((n) => n.id === id);
                  if (!selected) {
                    showToast({
                      title: "Note not found",
                      description: "The note may have already been removed.",
                      variant: "error",
                    });
                    return;
                  }

                  try {
                    await deleteNote(id);
                    showToast({
                      title: "Note deleted",
                      description: `"${selected.title}" removed successfully.`,
                      variant: "success",
                    });
                  } catch (err) {
                    showToast({
                      title: "Could not delete note",
                      description: getFirestoreErrorMessage(err),
                      variant: "error",
                    });
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <NoteEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        mode={editorMode}
        initial={initialDraft}
        onSave={async (draft) => {
          if (editorMode === "create") {
            try {
              await createNote({
                title: draft.title,
                content: draft.excerpt,
                tag: draft.tag,
              });
              showToast({
                title: "Note created",
                description: `"${draft.title}" is ready.`,
                variant: "success",
              });
            } catch (err) {
              showToast({
                title: "Could not create note",
                description: getFirestoreErrorMessage(err),
                variant: "error",
              });
            }
            return;
          }

          if (!editingNoteId) return;

          try {
            await updateNote(editingNoteId, {
              title: draft.title,
              content: draft.excerpt,
              tag: draft.tag,
            });
            showToast({
              title: "Note saved",
              description: "Your changes were synced to the cloud.",
              variant: "success",
            });
          } catch (err) {
            showToast({
              title: "Could not save note",
              description: getFirestoreErrorMessage(err),
              variant: "error",
            });
          }
        }}
      />
    </PageContainer>
  );
}
