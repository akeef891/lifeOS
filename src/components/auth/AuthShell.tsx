import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Shared layout wrapper for login and register pages. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center sm:mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/15 sm:h-11 sm:w-11">
              <Sparkles className="h-4 w-4 text-violet-300 sm:h-5 sm:w-5" />
            </span>
            LifeOS
          </Link>
          <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:mt-6 sm:text-2xl">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-sm px-1 text-sm leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
        </div>

        <GlassCard padding="lg" hover={false} className="w-full">
          {children}
        </GlassCard>

        {footer ? (
          <div className="mt-5 text-center text-sm text-muted sm:mt-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
