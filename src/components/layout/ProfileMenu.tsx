"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { DropdownPanel } from "@/components/ui/DropdownPanel";
import { ProfileModal } from "@/components/layout/ProfileModal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import {
  defaultProfile,
  storageKeys,
  type UserProfile,
} from "@/lib/storageKeys";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export function ProfileMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);

  const { state: profile, setState: setProfile } = useLocalStorageState<UserProfile>(
    storageKeys.profile,
    () => defaultProfile
  );

  useClickOutside(containerRef, () => setOpen(false), open);

  const initials = getInitials(profile.displayName);

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-gradient-to-br from-violet-500/30 to-indigo-600/30 text-xs font-semibold text-foreground transition-transform hover:scale-105",
            open && "ring-2 ring-violet-500/40"
          )}
          aria-label="Account menu"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {initials}
        </button>

        <DropdownPanel open={open} className="w-[min(100vw-2rem,16rem)]">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <p className="truncate text-sm font-semibold text-foreground">
              {profile.displayName}
            </p>
            <p className="truncate text-xs text-muted">{profile.email}</p>
          </div>

          <div className="p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setProfileOpen(true);
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.06]"
            >
              <User className="h-4 w-4 text-muted" />
              View profile
            </button>
            <Link
              href="/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.06]"
            >
              <Settings className="h-4 w-4 text-muted" />
              Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setLogoutMessage(true);
                window.setTimeout(() => setLogoutMessage(false), 2500);
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-rose-300 transition-colors hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </DropdownPanel>
      </div>

      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        onSave={setProfile}
      />

      {logoutMessage && (
        <div
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-white/[0.08] bg-zinc-950/95 px-4 py-2 text-sm text-foreground shadow-xl backdrop-blur-xl"
          role="status"
        >
          Sign out will be available when authentication is connected.
        </div>
      )}
    </>
  );
}
