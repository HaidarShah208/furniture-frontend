"use client";

interface AdminTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function AdminTableSkeleton({ rows = 5, columns = 6 }: AdminTableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-luxury-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-luxury-border bg-luxury-muted-bg/30">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-5 py-3">
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-border">
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: columns }).map((_, c) => (
                  <td key={c} className="px-5 py-3">
                    <div className={`h-4 animate-pulse rounded bg-gray-200 ${c === 0 ? "w-24" : "w-16"}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
