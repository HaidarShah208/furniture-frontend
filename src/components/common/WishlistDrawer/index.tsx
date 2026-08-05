"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@/components/common/Drawer";
import AnimatedButton from "@/components/common/AnimatedButton";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart, isInCart } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product);
    removeItem(product.id);
  };

  return (
    <Drawer open={open} onClose={onClose} side="right" title="Wishlist">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
                <Heart className="h-7 w-7 text-luxury-muted" />
              </div>
              <h3 className="mb-1 text-base font-bold text-luxury-dark">
                Your wishlist is empty
              </h3>
              <p className="mb-6 text-sm text-luxury-muted">
                Save your favorite pieces for later
              </p>
              <AnimatedButton variant="primary" size="sm" onClick={onClose}>
                Explore Collection
              </AnimatedButton>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((product) => {
                const alreadyInCart = isInCart(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 flex gap-4 rounded-xl border border-luxury-border p-3 transition-all duration-300 hover:border-luxury-gold/30"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={onClose}
                            className="text-sm font-semibold text-luxury-dark transition-colors hover:text-luxury-gold"
                          >
                            {product.name}
                          </Link>
                          <p className={cn(
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
                          </p>
                          <p className="mt-1 text-sm font-bold text-luxury-gold">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-luxury-muted transition-colors hover:text-red-500"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        disabled={alreadyInCart || product.availability === "out-of-stock"}
                        className={cn(
                          "mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors",
                          alreadyInCart
                            ? "text-luxury-muted"
                            : "text-luxury-dark hover:text-luxury-gold"
                        )}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {alreadyInCart ? "Already in Cart" : "Move to Cart"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-luxury-border bg-white p-6">
            <p className="mb-4 text-center text-xs text-luxury-muted">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
            <div className="space-y-2.5">
              <AnimatedButton variant="primary" size="md" className="w-full" onClick={onClose}>
                Continue Shopping
              </AnimatedButton>
              <button
                onClick={clearWishlist}
                className="flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-luxury-muted transition-colors hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
