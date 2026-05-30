"use client";

import { AlertCircle } from "lucide-react";

interface FirestoreErrorBannerProps {
  message: string;
}

/** Inline banner for Firestore sync errors (avoids duplicate toasts). */
export function FirestoreErrorBanner({ message }: FirestoreErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
      <p className="leading-relaxed">{message}</p>
    </div>
  );
}
