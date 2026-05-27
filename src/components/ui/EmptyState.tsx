"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex min-h-[220px] flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12",
        className
      )}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] sm:h-14 sm:w-14"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5 text-muted sm:h-6 sm:w-6" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold text-foreground sm:text-base">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
