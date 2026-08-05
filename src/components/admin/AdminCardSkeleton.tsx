"use client";

interface AdminCardSkeletonProps {
  count?: number;
}

export default function AdminCardSkeleton({ count = 4 }: AdminCardSkeletonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-7 w-12 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
