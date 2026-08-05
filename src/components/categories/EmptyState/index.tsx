"use client";

import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
import AnimatedButton from "@/components/common/AnimatedButton";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-luxury-border bg-white px-8 py-20 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
        <Search className="h-7 w-7 text-luxury-muted" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-luxury-dark">
        No Collections Found
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-luxury-muted">
        We couldn&apos;t find any collections matching your current filters.
        Try adjusting your criteria or reset all filters.
      </p>
      <AnimatedButton variant="outline" size="md" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
        Reset All Filters
      </AnimatedButton>
    </motion.div>
  );
}
