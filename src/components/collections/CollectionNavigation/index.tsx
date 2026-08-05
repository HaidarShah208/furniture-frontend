"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LuxeCollection } from "@/types/collection";

interface CollectionNavigationProps {
  collections: LuxeCollection[];
  activeSlug?: string;
  onSelect: (slug: string) => void;
}

export default function CollectionNavigation({
  collections,
  activeSlug,
  onSelect,
}: CollectionNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-b border-luxury-border"
    >
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-1 overflow-x-auto px-4 sm:justify-center sm:px-0"
      >
        <button
          onClick={() => onSelect("")}
          className={cn(
            "relative shrink-0 px-5 py-4 text-sm font-medium tracking-wide transition-colors duration-300",
            !activeSlug
              ? "text-luxury-dark"
              : "text-luxury-muted hover:text-luxury-dark"
          )}
        >
          All Collections
          {!activeSlug && (
            <motion.div
              layoutId="collectionNavIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
        {collections.map((col) => (
          <button
            key={col.slug}
            onClick={() => onSelect(col.slug)}
            className={cn(
              "relative shrink-0 px-5 py-4 text-sm font-medium tracking-wide transition-colors duration-300",
              activeSlug === col.slug
                ? "text-luxury-dark"
                : "text-luxury-muted hover:text-luxury-dark"
            )}
          >
            {col.name}
            {activeSlug === col.slug && (
              <motion.div
                layoutId="collectionNavIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
