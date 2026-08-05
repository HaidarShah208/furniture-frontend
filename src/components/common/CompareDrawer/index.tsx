"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Trash2, GitCompare, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@/components/common/Drawer";
import AnimatedButton from "@/components/common/AnimatedButton";
import { useCompare } from "@/hooks/useCompare";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface CompareDrawerProps {
  open: boolean;
  onClose: () => void;
}

const compareFields = [
  { key: "price", label: "Price" },
  { key: "material", label: "Material" },
  { key: "dimensions", label: "Dimensions" },
  { key: "rating", label: "Rating" },
  { key: "availability", label: "Availability" },
  { key: "collection", label: "Collection" },
  { key: "estimatedDelivery", label: "Delivery" },
] as const;

export default function CompareDrawer({ open, onClose }: CompareDrawerProps) {
  const { items, removeItem, clearCompare } = useCompare();
  const { addItem: addToCart, isInCart } = useCart();

  const renderValue = (field: typeof compareFields[number], product: typeof items[0]) => {
    switch (field.key) {
      case "price":
        return (
          <span className="font-bold text-luxury-dark">
            ${product.price.toLocaleString()}
            {product.originalPrice && (
              <span className="ml-1 text-xs font-normal text-luxury-muted line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </span>
        );
      case "rating":
        return (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
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
            </div>
            <span className="text-xs text-luxury-muted">({product.reviews})</span>
          </div>
        );
      case "availability":
        return (
          <span className={cn(
            "text-xs font-medium",
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
                : "Out of Stock"}
          </span>
        );
      default:
        return (
          <span className="text-sm text-luxury-secondary">
            {String(product[field.key])}
          </span>
        );
    }
  };

  return (
    <Drawer open={open} onClose={onClose} side="right" title="Compare Products">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
                <GitCompare className="h-7 w-7 text-luxury-muted" />
              </div>
              <h3 className="mb-1 text-base font-bold text-luxury-dark">
                No products to compare
              </h3>
              <p className="mb-6 text-sm text-luxury-muted">
                Add up to 4 products to compare side by side
              </p>
              <AnimatedButton variant="primary" size="sm" onClick={onClose}>
                Browse Products
              </AnimatedButton>
            </div>
          ) : (
            <div className="px-4 py-4">
              {/* Product image headers */}
              <div className="mb-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
                <AnimatePresence mode="popLayout">
                  {items.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="relative text-center"
                    >
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-luxury-muted shadow-sm transition-colors hover:text-red-500"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl border border-luxury-border bg-luxury-muted-bg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="120px"
                          />
                        </div>
                        <h4 className="mt-2 line-clamp-2 text-xs font-bold text-luxury-dark transition-colors group-hover:text-luxury-gold">
                          {product.name}
                        </h4>
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={isInCart(product.id) || product.availability === "out-of-stock"}
                        className={cn(
                          "mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                          isInCart(product.id)
                            ? "bg-luxury-muted-bg text-luxury-muted"
                            : "bg-luxury-dark text-white hover:bg-luxury-gold"
                        )}
                      >
                        <ShoppingBag className="h-3 w-3" />
                        {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Comparison table */}
              <div className="overflow-hidden rounded-xl border border-luxury-border">
                {compareFields.map((field, fieldIndex) => (
                  <div
                    key={field.key}
                    className={cn(
                      "grid gap-px",
                      fieldIndex % 2 === 0 ? "bg-luxury-muted-bg/50" : "bg-white"
                    )}
                    style={{ gridTemplateColumns: `100px repeat(${items.length}, minmax(0, 1fr))` }}
                  >
                    <div className="flex items-center px-3 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-luxury-dark">
                        {field.label}
                      </span>
                    </div>
                    {items.map((product) => (
                      <div key={product.id} className="flex items-center px-3 py-3">
                        {renderValue(field, product)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-luxury-border bg-white p-6">
            <p className="mb-4 text-center text-xs text-luxury-muted">
              Comparing {items.length} of 4 products
            </p>
            <div className="space-y-2.5">
              <AnimatedButton variant="outline" size="md" className="w-full" onClick={onClose}>
                Continue Shopping
              </AnimatedButton>
              <button
                onClick={clearCompare}
                className="flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-luxury-muted transition-colors hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
