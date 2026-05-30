"use client";

import { Skeleton } from "@/components/ui/Skeleton";

/** Full-screen loading state shown while auth state is being resolved. */
export function AuthLoadingScreen() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-8">
      <div
        className="w-full max-w-md space-y-5 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6 backdrop-blur-xl sm:space-y-6 sm:p-8"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-xl sm:h-11 sm:w-11" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <p className="text-center text-sm text-muted">Checking authentication…</p>
      </div>
    </div>
  );
}
