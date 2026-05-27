import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  SkeletonLines,
  SkeletonListRows,
  SkeletonStatCard,
} from "@/components/ui/SkeletonBlocks";

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
            <SkeletonStatCard />
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3" padding="lg">
          <Skeleton className="h-5 w-36" />
          <SkeletonListRows className="mt-6" rows={4} />
        </GlassCard>
        <GlassCard className="lg:col-span-2" padding="lg">
          <Skeleton className="h-5 w-28" />
          <SkeletonLines className="mt-6" lines={7} />
        </GlassCard>
      </div>
    </div>
  );
}
