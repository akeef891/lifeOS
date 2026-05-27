"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownPanelProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}

export function DropdownPanel({
  open,
  children,
  className,
  align = "right",
}: DropdownPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "absolute top-[calc(100%+8px)] z-50 w-[min(100vw-1rem,22rem)] max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl",
            align === "right" ? "right-0" : "left-0",
            className
          )}
          role="menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
