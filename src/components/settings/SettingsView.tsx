"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [focusReminders, setFocusReminders] = useState(true);
  const [theme, setTheme] = useState<"dark" | "system">("dark");

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your profile, appearance, and notifications."
      />

      <GlassCard padding="lg" hover>
        <h3 className="text-base font-semibold text-foreground">Profile</h3>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/30 to-indigo-600/30"
            aria-hidden="true"
          >
            <User className="h-7 w-7 text-violet-300" />
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-muted">Display name</span>
              <input
                type="text"
                defaultValue="LifeOS User"
                className={cn(
                  "mt-1.5 h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
                  "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                )}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                type="email"
                defaultValue="you@lifeos.app"
                className={cn(
                  "mt-1.5 h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-foreground",
                  "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                )}
              />
            </label>
          </div>
        </div>
      </GlassCard>

      <GlassCard padding="lg" hover>
        <h3 className="text-base font-semibold text-foreground">Theme</h3>
        <p className="mt-1 text-sm text-muted">Choose how LifeOS looks on your device.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["dark", "system"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors",
                theme === option
                  ? "border-violet-500/50 bg-violet-500/15 text-foreground"
                  : "border-white/[0.08] bg-white/[0.04] text-muted hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard padding="lg" hover>
        <h3 className="text-base font-semibold text-foreground">Notifications</h3>
        <div className="mt-6 divide-y divide-white/[0.06]">
          <div className="pb-4">
            <Toggle
              label="Email notifications"
              description="Task reminders and weekly summaries"
              checked={emailNotif}
              onChange={setEmailNotif}
            />
          </div>
          <div className="py-4">
            <Toggle
              label="Push notifications"
              description="Real-time alerts on this device"
              checked={pushNotif}
              onChange={setPushNotif}
            />
          </div>
          <div className="py-4">
            <Toggle
              label="Weekly digest"
              description="Sunday overview of your progress"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </div>
          <div className="pt-4">
            <Toggle
              label="Focus reminders"
              description="Nudge before scheduled deep work"
              checked={focusReminders}
              onChange={setFocusReminders}
            />
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
