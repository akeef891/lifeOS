import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/[0.05] skeleton-shimmer",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

