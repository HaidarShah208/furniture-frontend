"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LuxuryTextareaProps } from "@/types/common";

const baseClasses =
  "w-full rounded-lg border border-luxury-border bg-white px-4 py-3 text-sm text-luxury-dark transition-all duration-300 placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30";

const LuxuryTextarea = forwardRef<HTMLTextAreaElement, LuxuryTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            baseClasses,
            "min-h-[120px] resize-y",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

LuxuryTextarea.displayName = "LuxuryTextarea";
export default LuxuryTextarea;
