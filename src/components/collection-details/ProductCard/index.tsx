"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, GitCompare, Star, ArrowRight } from "lucide-react";
import Badge from "@/components/common/Badge";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface PLPProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

export default function PLPProductCard({ product, index, onQuickView }: PLPProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();
  const { toggleItem: toggleCompare, isInCompare } = useCompare();
  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);
  const secondImage = product.images.length > 1 ? product.images[1].src : null;

  const colorVariant = product.variants.find(
    (v) => v.type === "color" || v.type === "swatch"
  );
  const visibleColors = colorVariant?.options.slice(0, 4) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" as const }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/40 hover:luxury-shadow-hover">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                isHovered && "scale-110"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={`${product.name} alternate view`}
                fill
                className={cn(
                  "object-cover transition-all duration-700 ease-out",
                  isHovered ? "opacity-100 scale-110" : "opacity-0"
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )}

            {product.badge && (
              <div className="absolute left-3.5 top-3.5 z-10">
                <Badge variant={product.badge === "Sale" ? "gold" : "dark"}>
                  {product.badge}
                </Badge>
              </div>
            )}

            <div className={cn(
              "absolute right-3.5 top-3.5 z-10 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            )}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                  wishlisted
                    ? "bg-luxury-gold text-white"
                    : "bg-white/90 text-luxury-text hover:bg-luxury-gold hover:text-white"
                )}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-white")} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-text backdrop-blur-sm transition-colors hover:bg-luxury-gold hover:text-white"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.preventDefault(); toggleCompare(product); }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                  compared
                    ? "bg-luxury-gold text-white"
                    : "bg-white/90 text-luxury-text hover:bg-luxury-gold hover:text-white"
                )}
                aria-label={compared ? "Remove from compare" : "Add to compare"}
              >
                <GitCompare className="h-4 w-4" />
              </motion.button>
            </div>

            <div className={cn(
              "absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/50 to-transparent p-4 transition-all duration-500",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            )}>
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-dark/90 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-luxury-gold">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>

        <div className="p-4 transition-transform duration-300 group-hover:-translate-y-0.5">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
            {product.collection}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mb-1 text-sm font-bold tracking-tight text-luxury-dark transition-colors duration-300 group-hover:text-luxury-gold">
              {product.name}
            </h3>
          </Link>
          <p className="mb-2 text-xs leading-relaxed text-luxury-muted line-clamp-1">
            {product.material}
          </p>

          <div className="mb-2.5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-luxury-gold text-luxury-gold"
                    : "fill-luxury-border text-luxury-border"
                )}
              />
            ))}
            <span className="ml-1 text-[11px] text-luxury-muted">({product.reviews})</span>
          </div>

          {visibleColors.length > 0 && (
            <div className="mb-3 flex items-center gap-1.5">
              {visibleColors.map((c) => (
                <span
                  key={c.id}
                  className="h-4 w-4 rounded-full border border-luxury-border/50"
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
              {(colorVariant?.options.length || 0) > 4 && (
                <span className="text-[10px] text-luxury-muted">
                  +{(colorVariant?.options.length || 0) - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-luxury-border pt-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-luxury-dark">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-luxury-muted line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[11px] font-medium",
              product.availability === "in-stock"
                ? "text-emerald-600"
                : product.availability === "pre-order"
                  ? "text-amber-600"
                  : "text-red-500"
            )}>
              {product.availability === "in-stock"
                ? "In Stock"
                : product.availability === "pre-order"
                  ? "Pre-Order"
                  : "Sold Out"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
