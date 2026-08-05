"use client";

import Skeleton from "@/components/common/Skeleton";
import Container from "@/components/common/Container";

export default function CollectionLoadingSkeleton() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mb-16 flex flex-col items-center">
          <Skeleton className="mb-3 h-4 w-28" />
          <Skeleton className="mb-4 h-10 w-72" />
          <Skeleton className="h-5 w-96 max-w-full" />
          <Skeleton className="mt-6 h-px w-16" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-luxury-border bg-white">
              <Skeleton className="aspect-4/5 w-full" rounded="sm" />
              <div className="p-6">
                <Skeleton className="mb-2 h-3 w-24" />
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
