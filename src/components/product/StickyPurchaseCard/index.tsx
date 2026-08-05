"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyPurchaseCardProps {
  price: number;
  originalPrice?: number;
  availability: string;
  estimatedDelivery: string;
}

export default function StickyPurchaseCard({
  price,
  originalPrice,
  availability,
  estimatedDelivery,
}: StickyPurchaseCardProps) {
  const [quantity, setQuantity] = useState(1);
  const isAvailable = availability !== "out-of-stock";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="sticky top-28 rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow"
    >
      <div className="mb-5 flex items-end gap-2">
        <span className="text-2xl font-bold text-luxury-dark">
          ${price.toLocaleString()}
        </span>
        {originalPrice && (
          <span className="text-base text-luxury-muted line-through">
            ${originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mb-5">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">
          Quantity
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-luxury-border">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center text-luxury-text transition-colors hover:text-luxury-dark"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex h-10 w-12 items-center justify-center border-x border-luxury-border text-sm font-semibold text-luxury-dark">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center text-luxury-text transition-colors hover:text-luxury-dark"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm font-bold text-luxury-dark">
            ${(price * quantity).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={!isAvailable}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500",
            isAvailable
              ? "bg-luxury-dark text-white hover:bg-luxury-gold"
              : "cursor-not-allowed bg-luxury-border text-luxury-muted"
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </motion.button>

        {isAvailable && (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-luxury-gold px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-500 hover:bg-luxury-gold-hover"
          >
            <Zap className="h-4 w-4" />
            Buy Now
          </motion.button>
        )}
      </div>

      <div className="mt-5 space-y-3 border-t border-luxury-border pt-5">
        <div className="flex items-start gap-2.5 text-sm">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
          <span className="text-luxury-secondary">Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-start gap-2.5 text-sm">
          <ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
          <span className="text-luxury-secondary">
            Estimated delivery: {estimatedDelivery}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
