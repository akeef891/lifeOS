import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonLinesProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
}

export function SkeletonLines({
  lines = 3,
  className,
  lineClassName,
}: SkeletonLinesProps) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-3.5 w-full",
            index === lines - 1 && "w-4/5",
            lineClassName
          )}
        />
      ))}
    </div>
  );
}

interface SkeletonStatCardProps {
  className?: string;
}

export function SkeletonStatCard({ className }: SkeletonStatCardProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2.5">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-8 w-16 sm:h-9" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

interface SkeletonListRowsProps {
  rows?: number;
  className?: string;
}

export function SkeletonListRows({
  rows = 4,
  className,
}: SkeletonListRowsProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

