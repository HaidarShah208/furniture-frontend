"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LuxuryInputProps } from "@/types/common";

const baseClasses =
  "w-full rounded-lg border border-luxury-border bg-white px-4 py-3 text-sm text-luxury-dark transition-all duration-300 placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30";

const LuxuryInput = forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseClasses,
              icon && "pl-11",
              error && "border-red-400 focus:border-red-400 focus:ring-red-400/30",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

LuxuryInput.displayName = "LuxuryInput";
export default LuxuryInput;
