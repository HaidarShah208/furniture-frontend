"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryFilters, FilterOption } from "@/types/category";
import {
  categories,
  materialOptions,
  colorOptions,
  collectionOptions,
  sortOptions,
} from "@/data/categories";

interface FiltersProps {
  filters: CategoryFilters;
  onFiltersChange: (filters: CategoryFilters) => void;
  resultCount: number;
}

const defaultFilters: CategoryFilters = {
  category: "",
  priceRange: [0, 10000],
  materials: [],
  colors: [],
  availability: "",
  collection: "",
  sortBy: "featured",
};

function FilterAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-luxury-border py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-wider text-luxury-dark"
        aria-expanded={isOpen}
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4 text-luxury-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxFilter({
  options,
  selected,
  onChange,
}: {
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="space-y-2.5">
      {options.map((option) => (
        <label
          key={option.id}
          className="group flex cursor-pointer items-center gap-3"
        >
          <div
            className={cn(
              "flex h-4.5 w-4.5 items-center justify-center rounded border transition-all duration-300",
              selected.includes(option.id)
                ? "border-luxury-gold bg-luxury-gold"
                : "border-luxury-border group-hover:border-luxury-gold/50"
            )}
          >
            {selected.includes(option.id) && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-3 w-3 text-white"
                viewBox="0 0 12 12"
              >
                <path
                  d="M3.5 6L5.5 8L8.5 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </div>
          <span className="flex-1 text-sm text-luxury-text transition-colors duration-200 group-hover:text-luxury-dark">
            {option.label}
          </span>
          {option.count !== undefined && (
            <span className="text-xs text-luxury-muted">{option.count}</span>
          )}
        </label>
      ))}
    </div>
  );
}

export default function Filters({
  filters,
  onFiltersChange,
  resultCount,
}: FiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof CategoryFilters>(
    key: K,
    value: CategoryFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => onFiltersChange(defaultFilters);

  const hasActiveFilters =
    filters.category !== "" ||
    filters.materials.length > 0 ||
    filters.colors.length > 0 ||
    filters.availability !== "" ||
    filters.collection !== "" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 10000;

  const categoryOptions: FilterOption[] = [
    ...new Map(
      categories.map((c) => [c.slug, { id: c.slug, label: c.name, count: c.itemCount }])
    ).values(),
  ];

  const filterContent = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-luxury-gold" />
          <span className="text-sm font-semibold uppercase tracking-wider text-luxury-dark">
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-medium text-luxury-gold transition-colors duration-300 hover:text-luxury-gold-hover"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      <div className="mb-4 text-xs text-luxury-muted">
        {resultCount} products found
      </div>

      <FilterAccordion title="Category" defaultOpen>
        <div className="space-y-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                updateFilter("category", filters.category === cat.id ? "" : cat.id)
              }
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-300",
                filters.category === cat.id
                  ? "bg-luxury-gold/10 font-medium text-luxury-gold"
                  : "text-luxury-text hover:bg-luxury-muted-bg"
              )}
            >
              {cat.label}
              <span className="text-xs text-luxury-muted">{cat.count}</span>
            </button>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Price Range">
        <div className="space-y-4 px-1">
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={filters.priceRange[1]}
            onChange={(e) =>
              updateFilter("priceRange", [
                filters.priceRange[0],
                parseInt(e.target.value),
              ])
            }
            className="w-full accent-luxury-gold"
          />
          <div className="flex items-center justify-between text-sm text-luxury-text">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterAccordion>

      <FilterAccordion title="Material">
        <CheckboxFilter
          options={materialOptions}
          selected={filters.materials}
          onChange={(vals) => updateFilter("materials", vals)}
        />
      </FilterAccordion>

      <FilterAccordion title="Color">
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              onClick={() =>
                updateFilter(
                  "colors",
                  filters.colors.includes(color.id)
                    ? filters.colors.filter((c) => c !== color.id)
                    : [...filters.colors, color.id]
                )
              }
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
                filters.colors.includes(color.id)
                  ? "border-luxury-gold bg-luxury-gold/10 text-luxury-gold"
                  : "border-luxury-border text-luxury-text hover:border-luxury-gold/50"
              )}
            >
              {color.label}
            </button>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Collection">
        <CheckboxFilter
          options={collectionOptions}
          selected={filters.collection ? [filters.collection] : []}
          onChange={(vals) => updateFilter("collection", vals[vals.length - 1] || "")}
        />
      </FilterAccordion>

      <FilterAccordion title="Availability">
        <div className="space-y-2">
          {[
            { id: "in-stock", label: "In Stock" },
            { id: "pre-order", label: "Pre-Order" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                updateFilter(
                  "availability",
                  filters.availability === opt.id ? "" : opt.id
                )
              }
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all duration-300",
                filters.availability === opt.id
                  ? "bg-luxury-gold/10 font-medium text-luxury-gold"
                  : "text-luxury-text hover:bg-luxury-muted-bg"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterAccordion>

      <div className="border-b border-luxury-border py-4">
        <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-luxury-dark">
          Sort By
        </span>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="w-full rounded-lg border border-luxury-border bg-white px-3 py-2.5 text-sm text-luxury-text focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-luxury-dark px-5 py-3 text-sm font-medium text-white shadow-lg lg:hidden"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold">
            !
          </span>
        )}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold text-luxury-dark">Filters</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-luxury-text hover:text-luxury-dark"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <aside className="sticky top-28 hidden h-fit lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow"
        >
          {filterContent}
        </motion.div>
      </aside>
    </>
  );
}
