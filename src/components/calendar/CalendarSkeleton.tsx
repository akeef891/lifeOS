import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export function CalendarSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading calendar">
      <Skeleton className="h-8 w-40" />
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3" padding="lg">
          <Skeleton className="h-64 w-full rounded-xl" />
        </GlassCard>
        <div className="space-y-3 lg:col-span-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
