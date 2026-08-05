"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { dropdownAnimation } from "@/lib/animations";
import type { LuxurySelectProps } from "@/types/common";

export default function LuxurySelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  className,
}: LuxurySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((o) => o.value === value)?.label;

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
    <div className="w-full">
      {label && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">
          {label}
        </span>
      )}
      <div ref={ref} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border border-luxury-border bg-white px-4 py-3 text-left text-sm text-luxury-dark transition-all duration-300 focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30",
            !value && "text-luxury-muted",
            error && "border-red-400"
          )}
          aria-expanded={isOpen}
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-luxury-muted transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...dropdownAnimation}
              className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-xl border border-luxury-border bg-white luxury-shadow-lg"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-4 py-2.5 text-sm transition-colors duration-150",
                    value === option.value
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
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
