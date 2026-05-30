"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowUpRight,
  CheckSquare,
  Circle,
  Plus,
  Inbox,
  NotebookPen,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTasks } from "@/hooks/useTasks";
import { useNotes } from "@/hooks/useNotes";

export function DashboardView() {
  const { tasks, loading: tasksLoading } = useTasks();
  const { notes, loading: notesLoading } = useNotes();

  const loading = tasksLoading || notesLoading;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const recentNotes = useMemo(() => notes.slice(0, 4), [notes]);
  const recentActivity = useMemo(() => {
    const items: { id: string; text: string; subtext: string; type: "task" | "note" }[] = [];

    tasks.slice(0, 3).forEach((task) => {
      items.push({
        id: `task-${task.id}`,
        text: task.completed ? `Completed "${task.title}"` : `Added "${task.title}"`,
        subtext: task.completed ? "Task completed" : `Due ${task.dueDate}`,
        type: "task",
      });
    });

    notes.slice(0, 3).forEach((note) => {
      items.push({
        id: `note-${note.id}`,
        text: `Updated note "${note.title}"`,
        subtext: note.updatedAt,
        type: "note",
      });
    });

    return items.slice(0, 5);
  }, [notes, tasks]);

  const stats = [
    {
      title: "Total tasks",
      value: `${totalTasks}`,
      change: totalTasks === 0 ? "No tasks yet" : `${completionRate}% completion`,
      trend: completionRate >= 50 ? ("up" as const) : ("neutral" as const),
      icon: CheckSquare,
    },
    {
      title: "Completed tasks",
      value: `${completedTasks}`,
      change: completedTasks > 0 ? "Great momentum" : "Nothing done yet",
      trend: completedTasks > 0 ? ("up" as const) : ("neutral" as const),
      icon: CheckSquare,
    },
    {
      title: "Pending tasks",
      value: `${pendingTasks}`,
      change: pendingTasks > 0 ? "Ready to prioritize" : "All clear",
      trend: pendingTasks > 0 ? ("neutral" as const) : ("up" as const),
      icon: Circle,
    },
    {
      title: "Recent notes",
      value: `${notes.length}`,
      change: notes.length > 0 ? `${recentNotes.length} visible on dashboard` : "No notes yet",
      trend: notes.length > 0 ? ("up" as const) : ("neutral" as const),
      icon: NotebookPen,
    },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-full max-w-lg" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <Skeleton className="h-72 rounded-2xl lg:col-span-3" />
          <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="space-y-1">
        <p className="text-sm font-medium text-violet-400">Good morning</p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Welcome back — here&apos;s your day at a glance
        </h2>
        <p className="text-sm text-muted sm:text-base">
          Wednesday, May 27 · Stay focused, ship what matters.
        </p>
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Overview statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </div>
      </section>

      <section
        className="grid gap-6 lg:grid-cols-5"
        aria-labelledby="activity-heading"
      >
        <GlassCard className="lg:col-span-3" padding="lg" hover>
          <div className="flex items-center justify-between gap-4">
            <h3 id="activity-heading" className="text-base font-semibold text-foreground">
              Recent activity
            </h3>
            <Link href="/tasks">
              <Button variant="ghost" size="sm">
                View tasks
              </Button>
            </Link>
          </div>

          {recentActivity.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No activity yet"
              description="Complete a task or create a note — activity will appear here."
              action={
                <Link href="/tasks">
                  <Button size="sm">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add your first task
                  </Button>
                </Link>
              }
              className="py-10"
            />
          ) : (
            <ul className="mt-4 space-y-3" role="list">
              {recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10"
                    aria-hidden="true"
                  >
                    {item.type === "task" ? (
                      <CheckSquare className="h-4 w-4 text-violet-400" />
                    ) : (
                      <NotebookPen className="h-4 w-4 text-violet-400" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                    <span className="block text-xs text-muted">{item.subtext}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard className="lg:col-span-2" padding="lg" hover>
          <h3 className="text-base font-semibold text-foreground">Recent notes</h3>
          {recentNotes.length === 0 ? (
            <EmptyState
              icon={NotebookPen}
              title="No notes yet"
              description="Create a note to see it here."
              action={
                <Link href="/notes">
                  <Button size="sm">Create note</Button>
                </Link>
              }
              className="px-0 py-8"
            />
          ) : (
            <ul className="mt-4 space-y-2" role="list">
              {recentNotes.map((note) => (
                <li key={note.id}>
                  <Link
                    href="/notes"
                    className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors hover:border-white/[0.06] hover:bg-white/[0.04]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-sm font-medium text-violet-400">
                      N
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {note.title}
                      </span>
                      <span className="block text-xs text-muted">{note.updatedAt}</span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </section>
    </div>
  );
}
