"use client";

import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopNav({ onMenuClick, title = "Dashboard" }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-white/[0.06] bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted hover:bg-white/[0.06] hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search..."
            className={cn(
              "h-9 w-48 rounded-lg border border-white/[0.08] bg-white/[0.04] pl-9 pr-3 text-sm text-foreground",
              "placeholder:text-muted focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 lg:w-64"
            )}
          />
        </label>

        <button
          type="button"
          className="relative rounded-lg p-2 text-muted hover:bg-white/[0.06] hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-gradient-to-br from-violet-500/30 to-indigo-600/30 text-xs font-medium text-foreground"
          aria-label="Account menu"
        >
          U
        </button>
      </div>
    </header>
  );
}
