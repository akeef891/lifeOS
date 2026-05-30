"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  defaultProfile,
  type UserProfile,
} from "@/lib/storageKeys";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function ProfileModal({
  open,
  onClose,
  profile,
  onSave,
}: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [email, setEmail] = useState(profile.email);

  useEffect(() => {
    if (!open) return;
    setDisplayName(profile.displayName);
    setEmail(profile.email);
  }, [open, profile]);

  const canSave =
    displayName.trim().length > 0 && email.trim().includes("@");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Profile"
      description="Update your display preferences for this device."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!canSave) return;
              onSave({
                displayName: displayName.trim(),
                email: email.trim(),
              });
              onClose();
            }}
            disabled={!canSave}
          >
            Save profile
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/30 to-indigo-600/30"
          aria-hidden="true"
        >
          <User className="h-7 w-7 text-violet-300" />
        </div>
        <div className="grid w-full gap-4">
          <label className="block">
            <span className="text-xs font-medium text-muted">Display name</span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={defaultProfile.displayName}
              className={cn(
                "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
                "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              )}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={defaultProfile.email}
              className={cn(
                "mt-1 h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
                "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              )}
            />
          </label>
        </div>
      </div>
    </Modal>
  );
}
