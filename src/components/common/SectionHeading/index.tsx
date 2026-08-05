"use client";

import { motion } from "framer-motion";
import type { SectionHeadingProps } from "@/types/common";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  subtitle,
  title,
  description,
  alignment = "center",
  light = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("mb-12 max-w-2xl md:mb-16", alignmentClasses[alignment])}
    >
      <span
        className={cn(
          "mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em]",
          light ? "text-luxury-gold-hover" : "text-luxury-gold"
        )}
      >
        {subtitle}
      </span>
      <h2
        className={cn(
          "mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-luxury-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed md:text-lg",
            light ? "text-white/70" : "text-luxury-muted"
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-16",
          alignment === "center" && "mx-auto",
          alignment === "right" && "ml-auto",
          light ? "bg-luxury-gold-hover" : "bg-luxury-gold"
        )}
      />
    </motion.div>
  );
}
