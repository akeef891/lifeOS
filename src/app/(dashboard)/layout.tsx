"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { TasksNotesProvider } from "@/context/TasksNotesContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <TasksNotesProvider>
        <DashboardShell>{children}</DashboardShell>
      </TasksNotesProvider>
    </AuthGuard>
  );
}
