"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PLPFilters, PLPFilterOption } from "@/types/filter";
import { defaultPLPFilters } from "@/types/filter";
import {
  plpMaterialOptions,
  plpWoodOptions,
  plpFabricOptions,
  plpColorOptions,
  plpRoomOptions,
  plpStyleOptions,
} from "@/data/collections";

interface FilterSidebarProps {
  filters: PLPFilters;
  onFiltersChange: (filters: PLPFilters) => void;
  visible: boolean;
  onClose: () => void;
}

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
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-luxury-dark"
        aria-expanded={isOpen}
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-3.5 w-3.5 text-luxury-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckList({
  options,
  selected,
  onChange,
}: {
  options: PLPFilterOption[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.id} className="group flex cursor-pointer items-center gap-2.5">
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded border transition-all duration-200",
              selected.includes(opt.id)
                ? "border-luxury-gold bg-luxury-gold"
                : "border-luxury-border group-hover:border-luxury-gold/50"
            )}
          >
            {selected.includes(opt.id) && (
              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12">
                <path d="M3.5 6L5.5 8L8.5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          {opt.swatch && (
            <span className="h-4 w-4 rounded-full border border-luxury-border" style={{ backgroundColor: opt.swatch }} />
          )}
          <span className="flex-1 text-sm text-luxury-text">{opt.label}</span>
          {opt.count !== undefined && <span className="text-xs text-luxury-muted">{opt.count}</span>}
        </label>
      ))}
    </div>
  );
}

function RadioList({
  options,
  selected,
  onChange,
}: {
  options: PLPFilterOption[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(selected === opt.id ? "" : opt.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200",
            selected === opt.id
              ? "bg-luxury-gold/8 font-medium text-luxury-gold"
              : "text-luxury-text hover:bg-luxury-muted-bg"
          )}
        >
          {opt.label}
          {opt.count !== undefined && <span className="text-xs text-luxury-muted">{opt.count}</span>}
        </button>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  visible,
  onClose,
}: FilterSidebarProps) {
  const update = <K extends keyof PLPFilters>(key: K, value: PLPFilters[K]) =>
    onFiltersChange({ ...filters, [key]: value });

  const reset = () => onFiltersChange(defaultPLPFilters);

  const hasActive =
    filters.materials.length > 0 ||
    filters.woodFinishes.length > 0 ||
    filters.fabrics.length > 0 ||
    filters.colors.length > 0 ||
    filters.room !== "" ||
    filters.style !== "" ||
    filters.availability !== "" ||
    filters.priceRange[1] < 15000;

  const sidebarContent = (
    <>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wider text-luxury-dark">Filters</span>
        {hasActive && (
          <button onClick={reset} className="flex items-center gap-1 text-xs font-medium text-luxury-gold hover:text-luxury-gold-hover">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      <FilterAccordion title="Price Range" defaultOpen>
        <div className="space-y-3 px-0.5">
          <input
            type="range"
            min={0}
            max={15000}
            step={250}
            value={filters.priceRange[1]}
            onChange={(e) => update("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-luxury-gold"
          />
          <div className="flex justify-between text-xs text-luxury-text">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterAccordion>

      <FilterAccordion title="Material" defaultOpen>
        <CheckList options={plpMaterialOptions} selected={filters.materials} onChange={(v) => update("materials", v)} />
      </FilterAccordion>

      <FilterAccordion title="Wood Finish">
        <CheckList options={plpWoodOptions} selected={filters.woodFinishes} onChange={(v) => update("woodFinishes", v)} />
      </FilterAccordion>

      <FilterAccordion title="Fabric">
        <CheckList options={plpFabricOptions} selected={filters.fabrics} onChange={(v) => update("fabrics", v)} />
      </FilterAccordion>

      <FilterAccordion title="Color">
        <div className="flex flex-wrap gap-2">
          {plpColorOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => update("colors", filters.colors.includes(c.id) ? filters.colors.filter((x) => x !== c.id) : [...filters.colors, c.id])}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200",
                filters.colors.includes(c.id) ? "border-luxury-gold bg-luxury-gold/8 text-luxury-gold" : "border-luxury-border text-luxury-text hover:border-luxury-gold/40"
              )}
            >
              {c.swatch && <span className="h-3 w-3 rounded-full border border-luxury-border/50" style={{ backgroundColor: c.swatch }} />}
              {c.label}
            </button>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Room">
        <RadioList options={plpRoomOptions} selected={filters.room} onChange={(v) => update("room", v)} />
      </FilterAccordion>

      <FilterAccordion title="Style">
        <RadioList options={plpStyleOptions} selected={filters.style} onChange={(v) => update("style", v)} />
      </FilterAccordion>

      <FilterAccordion title="Availability">
        <div className="space-y-1.5">
          {[{ id: "in-stock", label: "In Stock" }, { id: "pre-order", label: "Pre-Order" }].map((opt) => (
            <button
              key={opt.id}
              onClick={() => update("availability", filters.availability === opt.id ? "" : opt.id)}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all duration-200",
                filters.availability === opt.id ? "bg-luxury-gold/8 font-medium text-luxury-gold" : "text-luxury-text hover:bg-luxury-muted-bg"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterAccordion>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={onClose}
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
                <button onClick={onClose} className="rounded-lg p-1.5 text-luxury-text hover:text-luxury-dark" aria-label="Close filters">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <aside className="sticky top-28 hidden h-fit lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="rounded-2xl border border-luxury-border bg-white p-5 luxury-shadow"
        >
          {sidebarContent}
        </motion.div>
      </aside>
    </>
  );
}
