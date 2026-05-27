import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i} padding="md">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-3 h-3 w-20" />
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3" padding="lg">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-6 h-32 w-full rounded-xl" />
        </GlassCard>
        <GlassCard className="lg:col-span-2" padding="lg">
          <Skeleton className="h-5 w-28" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
