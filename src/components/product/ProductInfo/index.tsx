"use client";

import { motion } from "framer-motion";
import { Star, Heart, Share2, GitCompare, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import type { Product } from "@/types/product";
import type { SelectedVariants } from "@/types/variant";
import Badge from "@/components/common/Badge";
import VariantSelector from "@/components/product/VariantSelector";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
  selectedVariants: SelectedVariants;
  onVariantChange: (groupId: string, optionId: string) => void;
  currentPrice: number;
  currentOriginalPrice?: number;
  currentSku: string;
  currentAvailability: string;
}

export default function ProductInfo({
  product,
  selectedVariants,
  onVariantChange,
  currentPrice,
  currentOriginalPrice,
  currentSku,
  currentAvailability,
}: ProductInfoProps) {
  const discount = currentOriginalPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <div>
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
          {product.collection}
        </span>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-luxury-dark lg:text-4xl">
          {product.name}
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-luxury-gold text-luxury-gold"
                    : "fill-luxury-border text-luxury-border"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-luxury-muted">
            {product.rating} ({product.reviews} reviews)
          </span>
          {product.badge && (
            <Badge variant={product.badge === "Sale" ? "gold" : "dark"}>
              {product.badge}
            </Badge>
          )}
        </div>

        <p className="text-base leading-relaxed text-luxury-secondary">
          {product.description}
        </p>
      </div>

      <div className="border-t border-b border-luxury-border py-5">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-luxury-dark">
            ${currentPrice.toLocaleString()}
          </span>
          {currentOriginalPrice && (
            <>
              <span className="text-lg text-luxury-muted line-through">
                ${currentOriginalPrice.toLocaleString()}
              </span>
              <Badge variant="gold">-{discount}%</Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="w-28 font-medium text-luxury-dark">Availability</span>
          <span
            className={cn(
              "font-medium",
              currentAvailability === "in-stock"
                ? "text-green-600"
                : currentAvailability === "pre-order"
                ? "text-luxury-gold"
                : "text-red-500"
            )}
          >
            {currentAvailability === "in-stock"
              ? "In Stock"
              : currentAvailability === "pre-order"
              ? "Pre-Order"
              : "Out of Stock"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28 font-medium text-luxury-dark">SKU</span>
          <span className="text-luxury-muted">{currentSku}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28 font-medium text-luxury-dark">Material</span>
          <span className="text-luxury-muted">{product.material}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28 font-medium text-luxury-dark">Dimensions</span>
          <span className="text-luxury-muted">{product.dimensions}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28 font-medium text-luxury-dark">Delivery</span>
          <span className="text-luxury-muted">{product.estimatedDelivery}</span>
        </div>
      </div>

      {product.variants.length > 0 && (
        <div className="border-t border-luxury-border pt-6">
          <VariantSelector
            variants={product.variants}
            selected={selectedVariants}
            onSelect={onVariantChange}
          />
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-luxury-border pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
          aria-label="Share product"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
          aria-label="Compare product"
        >
          <GitCompare className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-luxury-border pt-6">
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-luxury-muted-bg p-3 text-center">
          <Truck className="h-5 w-5 text-luxury-gold" />
          <span className="text-[11px] font-medium text-luxury-dark">Free Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-luxury-muted-bg p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-luxury-gold" />
          <span className="text-[11px] font-medium text-luxury-dark">Warranty</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-luxury-muted-bg p-3 text-center">
          <RotateCcw className="h-5 w-5 text-luxury-gold" />
          <span className="text-[11px] font-medium text-luxury-dark">Easy Returns</span>
        </div>
      </div>
    </motion.div>
  );
}
