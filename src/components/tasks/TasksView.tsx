"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckSquare, Plus } from "lucide-react";
import type { Task } from "@/data/mock/tasks";
import { mockTasks } from "@/data/mock/tasks";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskEditorModal } from "@/components/tasks/TaskEditorModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { storageKeys } from "@/lib/storageKeys";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function TasksView() {
  const { state: tasks, setState: setTasks } = useLocalStorageState<Task[]>(
    storageKeys.tasks,
    () => mockTasks
  );
  const [editorOpen, setEditorOpen] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const total = tasks.length;
  const completed = completedTasks.length;
  const inProgress = total - completed;
  const percentComplete = total ? Math.round((completed / total) * 100) : 0;

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Productivity"
        title="Tasks"
        description="Track priorities, progress, and what ships next."
        action={
          <Button onClick={() => setEditorOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add task
          </Button>
        }
      />

      <GlassCard padding="lg" hover>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">Overall progress</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {percentComplete}% complete
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center sm:gap-8">
            <div>
              <p className="text-lg font-semibold text-foreground">{total}</p>
              <p className="text-xs text-muted">Total</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-400">{completed}</p>
              <p className="text-xs text-muted">Done</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-violet-400">
                {inProgress}
              </p>
              <p className="text-xs text-muted">In progress</p>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </GlassCard>

      <section aria-labelledby="active-tasks-heading">
        <h3
          id="active-tasks-heading"
          className="mb-4 text-sm font-medium text-muted"
        >
          Active · {activeTasks.length}
        </h3>

        {activeTasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No active tasks"
            description="Add a task to start building momentum. Your tasks persist locally."
            action={
              <Button onClick={() => setEditorOpen(true)} size="sm">
                Add your first task
              </Button>
            }
            className="py-10"
          />
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {activeTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onToggleComplete={(id) => {
                    setTasks((prev) =>
                      prev.map((t) => {
                        if (t.id !== id) return t;
                        const nextCompleted = !t.completed;
                        return {
                          ...t,
                          completed: nextCompleted,
                          progress: nextCompleted ? 100 : 0,
                        };
                      })
                    );
                  }}
                  onDelete={(id) => {
                    setTasks((prev) => prev.filter((t) => t.id !== id));
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {total > 0 && (
        <section aria-labelledby="completed-tasks-heading">
          <h3
            id="completed-tasks-heading"
            className="mb-4 text-sm font-medium text-muted"
          >
            Completed · {completedTasks.length}
          </h3>

          {completedTasks.length === 0 ? (
            <EmptyState
              icon={CheckSquare}
              title="Nothing completed yet"
              description="When you finish a task, it will appear here."
              className="py-8"
            />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {completedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onToggleComplete={(id) => {
                      setTasks((prev) =>
                        prev.map((t) => {
                          if (t.id !== id) return t;
                          const nextCompleted = !t.completed;
                          return {
                            ...t,
                            completed: nextCompleted,
                            progress: nextCompleted ? 100 : 0,
                          };
                        })
                      );
                    }}
                    onDelete={(id) => {
                      setTasks((prev) => prev.filter((t) => t.id !== id));
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      )}

      <TaskEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onCreate={(payload) => {
          const next: Task = {
            id: createId("task"),
            completed: false,
            progress: 0,
            ...payload,
          };
          setTasks((prev) => [next, ...prev]);
        }}
      />
    </PageContainer>
  );
}
