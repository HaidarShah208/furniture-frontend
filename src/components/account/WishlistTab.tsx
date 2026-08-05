"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, Star, ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export default function WishlistTab() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart, isInCart } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product);
    removeItem(product.id);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
          <Heart className="h-7 w-7 text-luxury-muted" />
        </div>
        <h3 className="mb-1 text-base font-bold text-luxury-dark">Your wishlist is empty</h3>
        <p className="mb-6 text-sm text-luxury-muted">Save your favourite pieces while browsing</p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
        >
          Explore Collections
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-luxury-dark">Wishlist</h2>
        <span className="text-xs text-luxury-muted">{items.length} items</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-xl border border-luxury-border bg-white transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
              >
                <Link href={`/products/${product.slug}`} className="relative block aspect-4/3 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); removeItem(product.id); }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-luxury-muted backdrop-blur-sm transition-colors hover:text-red-500"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Link>
                <div className="p-4">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                    {product.collection}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <h4 className="mb-1 text-sm font-bold text-luxury-dark transition-colors hover:text-luxury-gold">
                      {product.name}
                    </h4>
                  </Link>
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < Math.floor(product.rating) ? "fill-luxury-gold text-luxury-gold" : "fill-luxury-border text-luxury-border"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-luxury-dark">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={inCart}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
                        inCart
                          ? "bg-luxury-muted-bg text-luxury-muted"
                          : "bg-luxury-dark text-white hover:bg-luxury-gold"
                      )}
                    >
                      <ShoppingBag className="h-3 w-3" />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
