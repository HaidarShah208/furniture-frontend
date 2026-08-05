"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import type { BreadcrumbProps } from "@/types/common";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      aria-label="Breadcrumb"
      className="py-4"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-luxury-muted transition-colors duration-300 hover:text-luxury-gold"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-luxury-border" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-luxury-muted transition-colors duration-300 hover:text-luxury-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-luxury-dark">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
