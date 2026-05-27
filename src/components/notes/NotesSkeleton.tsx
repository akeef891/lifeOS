import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export function NotesSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading notes">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} padding="md">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-3 h-12 w-full" />
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
