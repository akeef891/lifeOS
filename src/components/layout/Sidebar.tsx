"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, bottomNavItems } from "@/config/navigation";
import { isNavActive } from "@/lib/navigation-utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navContent = (
    <div className="flex h-full flex-col pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20"
          aria-hidden="true"
        >
          <span className="text-sm font-bold text-white">L</span>
        </div>
        <span className="text-base font-semibold tracking-tight text-foreground">
          LifeOS
        </span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-xl p-2 text-muted hover:bg-white/[0.06] hover:text-foreground lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main">
        {mainNavItems.map((item) => {
          const isActive = isNavActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted hover:bg-white/[0.04] hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-[18px] w-[18px] shrink-0",
                  isActive ? "text-violet-400" : "text-muted group-hover:text-foreground"
                )}
                strokeWidth={1.75}
              />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] px-3 py-4">
        {bottomNavItems.map((item) => {
          const isActive = isNavActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted hover:bg-white/[0.04] hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-bottom"
                  className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-[18px] w-[18px]",
                  isActive ? "text-violet-400" : "text-muted group-hover:text-foreground"
                )}
                strokeWidth={1.75}
              />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)] glass transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-[260px] lg:translate-x-0 lg:rounded-none lg:border-r lg:border-y-0 lg:border-l-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        aria-label="Sidebar"
      >
        {navContent}
      </aside>
    </>
  );
}
