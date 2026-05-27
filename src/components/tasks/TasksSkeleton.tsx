import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export function TasksSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading tasks">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <GlassCard padding="lg">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-4 h-2 w-full" />
      </GlassCard>
      <div className="grid gap-3 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i} padding="md">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-4 h-1.5 w-full" />
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
