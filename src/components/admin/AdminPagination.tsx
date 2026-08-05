"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/admin/pagination";

interface AdminPaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function AdminPagination({ pagination, onPageChange, loading }: AdminPaginationProps) {
  const { page, totalPages, total, limit } = pagination;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-xs text-luxury-muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || loading}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-luxury-border text-luxury-muted transition-colors",
            page > 1 && !loading ? "hover:border-luxury-dark hover:text-luxury-dark" : "opacity-40"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | "...")[]>((acc, p, idx, arr) => {
            if (idx > 0 && p - (arr[idx - 1]) > 1) acc.push("...");
            acc.push(p);
            return acc;
          }, [])
          .map((item, idx) =>
            item === "..." ? (
              <span key={`dots-${idx}`} className="px-1 text-xs text-luxury-muted">...</span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item as number)}
                disabled={loading}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                  page === item
                    ? "bg-luxury-dark text-white"
                    : "border border-luxury-border text-luxury-muted hover:border-luxury-dark hover:text-luxury-dark"
                )}
              >
                {item}
              </button>
            )
          )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || loading}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-luxury-border text-luxury-muted transition-colors",
            page < totalPages && !loading ? "hover:border-luxury-dark hover:text-luxury-dark" : "opacity-40"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
