"use client";

import Skeleton from "@/components/common/Skeleton";
import Container from "@/components/common/Container";

export default function CategoryLoadingSkeleton() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mb-16 flex flex-col items-center">
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="mb-4 h-10 w-72" />
          <Skeleton className="h-5 w-96 max-w-full" />
          <Skeleton className="mt-6 h-px w-16" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-luxury-border bg-white">
              <Skeleton className="aspect-4/5 w-full" rounded="sm" />
              <div className="p-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-14" />
                </div>
                <Skeleton className="mb-1.5 h-5 w-3/4" />
                <Skeleton className="mb-3 h-4 w-full" />
                <div className="flex items-center justify-between border-t border-luxury-border pt-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
