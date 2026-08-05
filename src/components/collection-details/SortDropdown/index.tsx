"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sortOptions } from "@/types/sort";
import type { SortOption } from "@/types/sort";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLabel = sortOptions.find((o) => o.id === value)?.label || "Featured";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-luxury-border bg-white px-4 py-2.5 text-sm font-medium text-luxury-dark transition-all duration-300 hover:border-luxury-gold/50"
      >
        <span className="text-luxury-muted">Sort:</span>
        {currentLabel}
        <ChevronDown className={cn("h-4 w-4 text-luxury-muted transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-luxury-border bg-white luxury-shadow-lg"
          >
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center px-4 py-2.5 text-sm transition-colors duration-200",
                  value === option.id
                    ? "bg-luxury-muted-bg font-medium text-luxury-gold"
                    : "text-luxury-text hover:bg-luxury-muted-bg"
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
