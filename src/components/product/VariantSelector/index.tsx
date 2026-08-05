"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { VariantGroup, SelectedVariants } from "@/types/variant";

interface VariantSelectorProps {
  variants: VariantGroup[];
  selected: SelectedVariants;
  onSelect: (groupId: string, optionId: string) => void;
}

export default function VariantSelector({
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {variants.map((group) => (
        <div key={group.id}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-luxury-dark">
              {group.name}
            </span>
            {selected[group.id] && (
              <span className="text-sm text-luxury-muted">
                {group.options.find((o) => o.id === selected[group.id])?.label}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {group.options.map((option) => {
              const isSelected = selected[group.id] === option.id;

              if (group.type === "color") {
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      option.available && onSelect(group.id, option.id)
                    }
                    disabled={!option.available}
                    className={cn(
                      "relative h-10 w-10 rounded-full border-2 transition-all duration-300",
                      isSelected
                        ? "border-luxury-gold ring-2 ring-luxury-gold/20 ring-offset-2"
                        : "border-luxury-border hover:border-luxury-gold/50",
                      !option.available && "cursor-not-allowed opacity-40"
                    )}
                    style={{ backgroundColor: option.value }}
                    aria-label={`Select ${option.label}`}
                    title={option.label}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg className="h-4 w-4 text-white drop-shadow-sm" viewBox="0 0 12 12">
                          <path
                            d="M3 6L5.5 8.5L9 3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                    {!option.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-[130%] w-px rotate-45 bg-red-400" />
                      </div>
                    )}
                  </button>
                );
              }

              if (group.type === "swatch") {
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      option.available && onSelect(group.id, option.id)
                    }
                    disabled={!option.available}
                    className={cn(
                      "relative flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-all duration-300",
                      isSelected
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-luxury-border hover:border-luxury-gold/50",
                      !option.available && "cursor-not-allowed opacity-40"
                    )}
                    aria-label={`Select ${option.label}`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-luxury-border"
                      style={{ backgroundColor: option.value }}
                    />
                    <span className="text-sm font-medium text-luxury-dark">
                      {option.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={option.id}
                  onClick={() =>
                    option.available && onSelect(group.id, option.id)
                  }
                  disabled={!option.available}
                  className={cn(
                    "rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    isSelected
                      ? "border-luxury-gold bg-luxury-gold/5 text-luxury-dark"
                      : "border-luxury-border text-luxury-text hover:border-luxury-gold/50",
                    !option.available && "cursor-not-allowed opacity-40 line-through"
                  )}
                  aria-label={`Select ${option.label}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
