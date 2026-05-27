"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastItem extends ToastInput {
  id: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (input: ToastInput) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function createToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

const variantStyles: Record<ToastVariant, string> = {
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-100 [&_svg]:text-emerald-400",
  error: "border-rose-500/30 bg-rose-500/10 text-rose-100 [&_svg]:text-rose-400",
  info: "border-violet-500/30 bg-violet-500/10 text-violet-100 [&_svg]:text-violet-400",
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success") return <CheckCircle2 className="h-4 w-4" />;
  if (variant === "error") return <AlertCircle className="h-4 w-4" />;
  return <Info className="h-4 w-4" />;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = "info", durationMs = 2800 }: ToastInput) => {
      const id = createToastId();
      const next: ToastItem = {
        id,
        title,
        description,
        variant,
        durationMs,
      };

      setToasts((prev) => [...prev, next]);

      window.setTimeout(() => {
        dismissToast(id);
      }, durationMs);

      return id;
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] p-3 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-full sm:max-w-sm"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pointer-events-auto mb-2"
              role="status"
            >
              <div
                className={cn(
                  "rounded-2xl border shadow-2xl shadow-black/40 backdrop-blur-xl",
                  "bg-zinc-950/95 p-3 text-sm",
                  variantStyles[toast.variant]
                )}
              >
                <div className="flex items-start gap-2.5">
                  <ToastIcon variant={toast.variant} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{toast.title}</p>
                    {toast.description && (
                      <p className="mt-0.5 text-xs text-zinc-300">
                        {toast.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-zinc-100"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastContext must be used within ToastProvider.");
  }
  return ctx;
}

