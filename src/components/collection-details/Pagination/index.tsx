"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-12 flex items-center justify-center gap-1.5"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-40 disabled:hover:border-luxury-border disabled:hover:text-luxury-text"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="flex h-10 w-10 items-center justify-center text-sm text-luxury-muted">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300",
              currentPage === page
                ? "bg-luxury-dark text-white"
                : "border border-luxury-border text-luxury-text hover:border-luxury-gold hover:text-luxury-gold"
            )}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-40 disabled:hover:border-luxury-border disabled:hover:text-luxury-text"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
