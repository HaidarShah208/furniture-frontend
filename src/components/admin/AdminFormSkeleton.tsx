"use client";

export default function AdminFormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {[1, 2, 3].map((section) => (
        <div key={section} className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-4">
            <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-11 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-11 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
