"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  index?: number;
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <GlassCard hover padding="md" className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted">{title}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {value}
            </p>
            {change && (
              <p
                className={cn(
                  "mt-2 flex items-center gap-1 text-xs font-medium",
                  trend === "up" && "text-emerald-400",
                  trend === "down" && "text-rose-400",
                  trend === "neutral" && "text-muted"
                )}
              >
                {trend === "up" && <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />}
                {trend === "down" && <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />}
                {change}
              </p>
            )}
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-violet-500/10"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
