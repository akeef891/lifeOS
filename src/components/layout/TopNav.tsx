"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { NotificationsMenu } from "@/components/layout/NotificationsMenu";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopNav({ onMenuClick, title = "Dashboard" }: TopNavProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="min-w-0 truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {title}
        </h1>

        <div
          className={cn(
            "ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3",
            mobileSearchOpen && "sm:flex"
          )}
        >
          <GlobalSearch
            mobileOpen={mobileSearchOpen}
            onMobileOpenChange={setMobileSearchOpen}
          />
          <NotificationsMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
