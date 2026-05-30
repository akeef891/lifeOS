"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckSquare, FileText, Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTasks } from "@/hooks/useTasks";
import { useNotes } from "@/hooks/useNotes";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { searchTasksAndNotes } from "@/lib/global-search";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ mobileOpen, onMobileOpenChange }: GlobalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const { tasks, loading: tasksLoading } = useTasks();
  const { notes, loading: notesLoading } = useNotes();
  const loading = tasksLoading || notesLoading;

  const results = useMemo(
    () => searchTasksAndNotes(query, tasks, notes),
    [query, tasks, notes]
  );

  const showPanel = focused && query.trim().length > 0;

  const openSearch = useCallback(() => {
    onMobileOpenChange(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [onMobileOpenChange]);

  useKeyboardShortcut("mod+k", openSearch);

  useEffect(() => {
    if (mobileOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [mobileOpen]);

  const handleSelect = () => {
    setQuery("");
    setFocused(false);
    onMobileOpenChange(false);
    inputRef.current?.blur();
  };

  const searchInput = (
    <>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          window.setTimeout(() => setFocused(false), 150);
        }}
        placeholder="Search tasks & notes..."
        aria-label="Search tasks and notes"
        aria-controls="global-search-results"
        className={cn(
          "h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-3 text-sm text-foreground sm:pr-16",
          "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        )}
      />
      <kbd
        className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-muted sm:inline"
        aria-hidden="true"
      >
        Ctrl K
      </kbd>
    </>
  );

  const resultsPanel = (
    <AnimatePresence>
      {showPanel && (
        <motion.div
          id="global-search-results"
          ref={panelRef}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl",
            "max-h-[min(60vh,320px)] overflow-y-auto"
          )}
        >
          {loading ? (
            <div className="space-y-2 p-3" aria-busy="true">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted">
              No results for &ldquo;{query.trim()}&rdquo;
            </p>
          ) : (
            <ul className="p-2" role="list">
              {results.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <Link
                    href={item.href}
                    onClick={handleSelect}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10"
                      aria-hidden="true"
                    >
                      {item.type === "task" ? (
                        <CheckSquare className="h-4 w-4 text-violet-400" />
                      ) : (
                        <FileText className="h-4 w-4 text-violet-400" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {item.subtitle}
                      </span>
                    </span>
                    <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wide text-muted">
                      {item.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="relative hidden min-w-0 flex-1 sm:block sm:max-w-xs lg:max-w-sm">
        <label className="relative block">
          <span className="sr-only">Search tasks and notes</span>
          {searchInput}
        </label>
        {resultsPanel}
      </div>

      <button
        type="button"
        onClick={openSearch}
        className="rounded-xl p-2.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground sm:hidden"
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onMobileOpenChange(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-x-0 top-16 z-50 border-b border-white/[0.06] bg-background/95 px-3 py-3 backdrop-blur-xl sm:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="relative">
                <label className="relative block">
                  <span className="sr-only">Search tasks and notes</span>
                  {searchInput}
                </label>
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted hover:text-foreground sm:hidden"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {query.trim().length > 0 && (
                <div className="mt-3 max-h-[55vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-950/95">
                  {loading ? (
                    <div className="space-y-2 p-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : results.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-muted">
                      No results found
                    </p>
                  ) : (
                    <ul className="p-2" role="list">
                      {results.map((item) => (
                        <li key={`mobile-${item.type}-${item.id}`}>
                          <Link
                            href={item.href}
                            onClick={handleSelect}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.06]"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                              {item.type === "task" ? (
                                <CheckSquare className="h-4 w-4 text-violet-400" />
                              ) : (
                                <FileText className="h-4 w-4 text-violet-400" />
                              )}
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-foreground">
                                {item.title}
                              </span>
                              <span className="block truncate text-xs text-muted">
                                {item.subtitle}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
