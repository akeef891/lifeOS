"use client";

import { useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { DropdownPanel } from "@/components/ui/DropdownPanel";
import { Button } from "@/components/ui/Button";
import type { AppNotification } from "@/data/mock/notifications";
import { mockNotifications } from "@/data/mock/notifications";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { storageKeys } from "@/lib/storageKeys";
import { cn } from "@/lib/utils";

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { state: notifications, setState: setNotifications } =
    useLocalStorageState<AppNotification[]>(
      storageKeys.notifications,
      () => mockNotifications
    );

  useClickOutside(containerRef, () => setOpen(false), open);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative rounded-xl p-2.5 text-muted transition-colors",
          "hover:bg-white/[0.06] hover:text-foreground",
          open && "bg-white/[0.06] text-foreground"
        )}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <DropdownPanel open={open} className="w-[min(100vw-2rem,24rem)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="text-xs text-muted">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Mark all read
            </Button>
          )}
        </div>

        <ul className="max-h-[min(60vh,360px)] overflow-y-auto p-2" role="list">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <button
                type="button"
                role="menuitem"
                onClick={() => toggleRead(notification.id)}
                className={cn(
                  "w-full rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.06]",
                  !notification.read && "bg-white/[0.03]"
                )}
              >
                <div className="flex items-start gap-2">
                  {!notification.read && (
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500"
                      aria-hidden="true"
                    />
                  )}
                  <span className={cn("min-w-0", notification.read && "pl-4")}>
                    <span className="block text-sm font-medium text-foreground">
                      {notification.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted line-clamp-2">
                      {notification.message}
                    </span>
                    <span className="mt-1 block text-[10px] text-muted">
                      {notification.time}
                    </span>
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </DropdownPanel>
    </div>
  );
}

