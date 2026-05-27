import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonLines } from "@/components/ui/SkeletonBlocks";

export function NotesSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading notes">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} padding="md">
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-2/3" />
                <SkeletonLines className="mt-3" lines={3} lineClassName="h-3" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
