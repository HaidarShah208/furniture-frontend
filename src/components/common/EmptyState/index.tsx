"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import type { EmptyStateProps } from "@/types/common";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      {...fadeUp}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-luxury-border bg-white px-8 py-20 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
        {icon || <PackageOpen className="h-7 w-7 text-luxury-muted" />}
      </div>
      <h3 className="mb-2 text-lg font-bold text-luxury-dark">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-luxury-muted">
          {description}
        </p>
      )}
      {action}
    </motion.div>
  );
}
