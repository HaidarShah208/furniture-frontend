"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PageWrapperProps } from "@/types/common";

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn("min-h-screen", className)}
    >
      {children}
    </motion.main>
  );
}
