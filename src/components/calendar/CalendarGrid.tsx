"use client";

import { cn } from "@/lib/utils";
import { DAYS, getMay2026Days } from "@/data/mock/calendar";

const TODAY = 27;

export function CalendarGrid() {
  const days = getMay2026Days();

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-muted"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((cell, i) => {
          const isToday = cell.currentMonth && cell.day === TODAY;
          return (
            <button
              key={`${cell.day}-${i}`}
              type="button"
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg text-sm transition-colors",
                cell.currentMonth
                  ? "text-foreground hover:bg-white/[0.06]"
                  : "text-muted/40",
                isToday &&
                  "bg-violet-600 font-medium text-white hover:bg-violet-500",
                cell.hasEvent &&
                  cell.currentMonth &&
                  !isToday &&
                  "font-medium"
              )}
            >
              {cell.day}
              {cell.hasEvent && cell.currentMonth && !isToday && (
                <span
                  className="absolute bottom-1.5 h-1 w-1 rounded-full bg-violet-400"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
