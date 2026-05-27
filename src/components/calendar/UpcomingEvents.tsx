"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { mockUpcomingEvents, type CalendarEvent } from "@/data/mock/calendar";
import { cn } from "@/lib/utils";

const colorMap: Record<CalendarEvent["color"], string> = {
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

export function UpcomingEvents() {
  return (
    <div className="space-y-3">
      {mockUpcomingEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <GlassCard hover padding="sm" className="flex items-center gap-3 !p-3">
            <div
              className={cn("h-10 w-1 shrink-0 rounded-full", colorMap[event.color])}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{event.title}</p>
              <p className="text-xs text-muted">
                {event.date} · {event.time}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
