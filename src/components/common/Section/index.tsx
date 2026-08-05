"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-tokens";
import type { SectionProps } from "@/types/common";

const sizeMap = spacing.section;

export default function Section({
  children,
  className,
  size = "lg",
  id,
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      id={id}
      className={cn(sizeMap[size], className)}
    >
      {children}
    </motion.section>
  );
}
