"use client";

import { motion } from "framer-motion";
import { Grid3X3, LayoutGrid, Search, SlidersHorizontal } from "lucide-react";
import SortDropdown from "@/components/collection-details/SortDropdown";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/types/sort";

interface ProductToolbarProps {
  totalProducts: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  gridCols: 3 | 4;
  onGridChange: (cols: 3 | 4) => void;
  onToggleFilters: () => void;
  filtersVisible: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function ProductToolbar({
  totalProducts,
  sortBy,
  onSortChange,
  gridCols,
  onGridChange,
  onToggleFilters,
  filtersVisible,
  searchQuery = "",
  onSearchChange,
}: ProductToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-luxury-border bg-white px-5 py-3.5 luxury-shadow"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleFilters}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-300 lg:hidden",
            filtersVisible
              ? "border-luxury-gold bg-luxury-gold/5 text-luxury-gold"
              : "border-luxury-border text-luxury-text hover:border-luxury-gold/50"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <span className="hidden text-sm text-luxury-muted sm:inline">
          <span className="font-semibold text-luxury-dark">{totalProducts}</span>{" "}
          {totalProducts === 1 ? "product" : "products"}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        {onSearchChange && (
          <div className="relative hidden w-full max-w-xs md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-luxury-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-luxury-border bg-white py-2 pl-9 pr-4 text-sm text-luxury-dark transition-all duration-300 placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
            />
          </div>
        )}
        <div className="hidden items-center gap-1 rounded-lg border border-luxury-border p-0.5 lg:flex">
          <button
            onClick={() => onGridChange(3)}
            className={cn(
              "rounded-md p-1.5 transition-all duration-200",
              gridCols === 3
                ? "bg-luxury-dark text-white"
                : "text-luxury-muted hover:text-luxury-dark"
            )}
            aria-label="3 column grid"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onGridChange(4)}
            className={cn(
              "rounded-md p-1.5 transition-all duration-200",
              gridCols === 4
                ? "bg-luxury-dark text-white"
                : "text-luxury-muted hover:text-luxury-dark"
            )}
            aria-label="4 column grid"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>
    </motion.div>
  );
}
