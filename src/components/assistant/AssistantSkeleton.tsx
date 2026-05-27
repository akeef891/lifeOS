import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export function AssistantSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading assistant">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-32 rounded-full" />
        ))}
      </div>
      <GlassCard padding="lg" className="min-h-[420px]">
        <Skeleton className="h-16 w-3/4 rounded-2xl" />
        <Skeleton className="mt-4 h-10 w-full rounded-xl" />
      </GlassCard>
    </PageContainer>
  );
}
