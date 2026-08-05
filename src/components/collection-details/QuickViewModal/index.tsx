"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Star, ShoppingBag, ArrowRight } from "lucide-react";
import Badge from "@/components/common/Badge";
import AnimatedButton from "@/components/common/AnimatedButton";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white luxury-shadow-lg"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-dark backdrop-blur-sm transition-colors hover:bg-luxury-dark hover:text-white"
              aria-label="Close quick view"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-l-2xl md:aspect-auto md:min-h-[500px]">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <div className="absolute left-4 top-4">
                    <Badge variant={product.badge === "Sale" ? "gold" : "dark"}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                  {product.collection}
                </span>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-luxury-dark">
                  {product.name}
                </h2>

                <div className="mb-3 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(product.rating)
                          ? "fill-luxury-gold text-luxury-gold"
                          : "fill-luxury-border text-luxury-border"
                      )}
                    />
                  ))}
                  <span className="text-xs text-luxury-muted">({product.reviews})</span>
                </div>

                <div className="mb-4 flex items-end gap-2">
                  <span className="text-2xl font-bold text-luxury-dark">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-luxury-muted line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="mb-5 text-sm leading-relaxed text-luxury-secondary">
                  {product.description}
                </p>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <span className="w-20 font-medium text-luxury-dark">Material</span>
                    <span className="text-luxury-muted">{product.material}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 font-medium text-luxury-dark">Delivery</span>
                    <span className="text-luxury-muted">{product.estimatedDelivery}</span>
                  </div>
                </div>

                {product.variants[0] && product.variants[0].type === "color" && (
                  <div className="mb-5">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                      {product.variants[0].name}
                    </span>
                    <div className="flex gap-2">
                      {product.variants[0].options.filter((o) => o.available).map((opt) => (
                        <span
                          key={opt.id}
                          className="h-7 w-7 rounded-full border-2 border-luxury-border"
                          style={{ backgroundColor: opt.value }}
                          title={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2.5">
                  <AnimatedButton variant="primary" size="md" className="flex-1">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </AnimatedButton>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border text-luxury-text transition-colors hover:border-luxury-gold hover:text-luxury-gold"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </div>

                <Link
                  href={`/categories/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-luxury-gold transition-colors hover:text-luxury-gold-hover"
                  onClick={onClose}
                >
                  View Full Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
