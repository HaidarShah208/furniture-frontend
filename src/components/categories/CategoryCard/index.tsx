"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/common/Badge";
import type { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
    >
      <Link href={`/categories/${category.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/40 hover:luxury-shadow-hover">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {category.badge && (
              <div className="absolute left-4 top-4">
                <Badge variant="gold">{category.badge}</Badge>
              </div>
            )}

            <motion.div
              className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-500 ease-out group-hover:translate-y-0"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-luxury-dark backdrop-blur-sm transition-colors duration-300 group-hover:bg-luxury-gold group-hover:text-white">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </motion.div>
          </div>

          <div className="p-5 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                {category.collection}
              </span>
              <span className="text-xs text-luxury-muted">
                {category.itemCount} pieces
              </span>
            </div>
            <h3 className="mb-1.5 text-lg font-bold tracking-tight text-luxury-dark transition-colors duration-300 group-hover:text-luxury-gold">
              {category.name}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-luxury-secondary line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center justify-between border-t border-luxury-border pt-3">
              <span className="text-sm text-luxury-muted">
                Starting from
              </span>
              <span className="text-base font-bold text-luxury-dark">
                ${category.startingPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
