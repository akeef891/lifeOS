import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export function SettingsSkeleton() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading settings">
      <Skeleton className="h-8 w-36" />
      {Array.from({ length: 3 }).map((_, i) => (
        <GlassCard key={i} padding="lg">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-6 h-24 w-full rounded-xl" />
        </GlassCard>
      ))}
    </PageContainer>
  );
}
