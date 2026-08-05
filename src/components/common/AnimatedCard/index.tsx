"use client";

import { motion } from "framer-motion";
import type { AnimatedCardProps } from "@/types/common";
import { cn } from "@/lib/utils";

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "group overflow-hidden rounded-2xl bg-luxury-white luxury-shadow transition-shadow duration-500",
        hover && "hover:luxury-shadow-hover",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
