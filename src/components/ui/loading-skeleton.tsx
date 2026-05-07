import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  count?: number;
  columns?: 1 | 2 | 3;
  showAvatar?: boolean;
}

export function SkeletonCard({
  count = 1,
  columns = 1,
  showAvatar = false,
}: SkeletonCardProps) {
  return (
    <div
      className={`grid gap-4 w-full ${
        columns === 2
          ? "grid-cols-1 md:grid-cols-2"
          : columns === 3
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl border border-white/10 bg-[#0f0f11] space-y-4 animate-pulse"
        >
          {showAvatar && (
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          )}
          <div className="space-y-3">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-1/2 rounded-lg" />
            <Skeleton className="h-8 w-1/2 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonRow({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-[#0f0f11] animate-pulse"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
