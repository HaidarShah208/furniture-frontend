"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LoadingStateProps } from "@/types/common";

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function LoadingState({
  text,
  size = "md",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className={cn(
          "rounded-full border-2 border-luxury-border border-t-luxury-gold",
          sizeMap[size]
        )}
      />
      {text && (
        <p className="text-sm font-medium text-luxury-muted">{text}</p>
      )}
    </div>
  );
}
