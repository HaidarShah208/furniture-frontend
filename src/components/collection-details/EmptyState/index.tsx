"use client";

import { motion } from "framer-motion";
import { PackageOpen, RotateCcw } from "lucide-react";
import AnimatedButton from "@/components/common/AnimatedButton";

interface EmptyStateProps {
  onReset: () => void;
}

export default function PLPEmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-luxury-border bg-white px-8 py-24 text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-luxury-muted-bg">
        <PackageOpen className="h-9 w-9 text-luxury-muted" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-luxury-dark">
        No Products Found
      </h3>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-luxury-muted">
        We couldn&apos;t find any products matching your current filters.
        Try adjusting your criteria or explore our full collection.
      </p>
      <AnimatedButton variant="outline" size="md" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
        Clear All Filters
      </AnimatedButton>
    </motion.div>
  );
}
