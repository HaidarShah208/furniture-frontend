"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import type { LuxeCollection } from "@/types/collection";

interface CollectionCardProps {
  collection: LuxeCollection;
  index: number;
  size?: "default" | "large";
}

export default function CollectionCard({
  collection,
  index,
  size = "default",
}: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-luxury-border transition-all duration-700 luxury-shadow hover:border-luxury-gold/40 hover:luxury-shadow-hover",
            size === "large" ? "aspect-[3/4]" : "aspect-[4/5]"
          )}
        >
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/30" />

          {collection.badge && (
            <div className="absolute left-5 top-5">
              <Badge variant="gold">{collection.badge}</Badge>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <motion.div className="transition-transform duration-500 group-hover:-translate-y-2">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                {collection.year} &middot; {collection.designer}
              </span>
              <h3 className={cn(
                "mb-2 font-bold tracking-tight text-white",
                size === "large" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              )}>
                {collection.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/60 line-clamp-2">
                {collection.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {collection.productCount} Pieces
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-luxury-gold transition-transform duration-700 group-hover:scale-x-100" />
        </div>
      </Link>
    </motion.div>
  );
}

