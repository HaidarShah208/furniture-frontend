"use client";

import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-luxury-border/60",
        className
      )}
    />
  );
}

export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-luxury-border bg-white"
        >
          <Shimmer className="aspect-[4/5] rounded-none" />
          <div className="space-y-3 p-5">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-5 w-3/4" />
            <Shimmer className="h-3 w-full" />
            <div className="flex items-center justify-between pt-2">
              <Shimmer className="h-5 w-16" />
              <Shimmer className="h-3 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
