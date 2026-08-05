"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus, X, Truck, ArrowRight, Tag, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@/components/common/Drawer";
import AnimatedButton from "@/components/common/AnimatedButton";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    coupon,
    setCoupon,
    discount,
    applyCoupon,
    couponApplied,
    shipping,
    tax,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    setCoupon(couponInput);
    applyCoupon(couponInput);
  };

  return (
    <Drawer open={open} onClose={onClose} side="right" title="Shopping Cart">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-luxury-border bg-luxury-muted-bg/50 px-6 py-3">
          <Truck className="h-4 w-4 text-luxury-gold" />
          <p className="text-xs text-luxury-secondary">
            {subtotal >= 2000
              ? "You qualify for complimentary white-glove delivery!"
              : `Add $${(2000 - subtotal).toLocaleString()} more for free delivery`}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
                <ShoppingBag className="h-7 w-7 text-luxury-muted" />
              </div>
              <h3 className="mb-1 text-base font-bold text-luxury-dark">
                Your cart is empty
              </h3>
              <p className="mb-6 text-sm text-luxury-muted">
                Discover our curated collection of luxury furniture
              </p>
              <AnimatedButton variant="primary" size="sm" onClick={onClose}>
                Continue Shopping
              </AnimatedButton>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 flex gap-4"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={onClose}
                    className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={onClose}
                            className="text-sm font-semibold text-luxury-dark transition-colors hover:text-luxury-gold"
                          >
                            {item.product.name}
                          </Link>
                          {item.variant && (
                            <p className="text-xs text-luxury-muted">{item.variant}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-luxury-muted transition-colors hover:text-red-500"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-luxury-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-luxury-muted transition-colors hover:text-luxury-dark disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-5 text-center text-sm font-medium text-luxury-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-luxury-muted transition-colors hover:text-luxury-dark"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-luxury-dark">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-luxury-border bg-white p-6">
            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-luxury-muted" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full rounded-lg border border-luxury-border py-2.5 pl-9 pr-3 text-xs text-luxury-dark transition-colors placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponInput.trim()}
                  className="rounded-lg bg-luxury-dark px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-luxury-gold disabled:opacity-40"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-1 text-xs text-emerald-600"
                >
                  <Check className="h-3 w-3" />
                  Coupon applied — {coupon.toUpperCase()} saves you ${discount.toLocaleString()}
                </motion.p>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-2.5 border-t border-luxury-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-luxury-secondary">Subtotal</span>
                <span className="font-medium text-luxury-dark">${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-600">Discount</span>
                  <span className="font-medium text-emerald-600">-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-luxury-secondary">Shipping</span>
                <span className={cn("font-medium", shipping === 0 ? "text-emerald-600" : "text-luxury-dark")}>
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-luxury-secondary">Estimated Tax</span>
                <span className="font-medium text-luxury-dark">${tax.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-luxury-border pt-3">
                <span className="text-sm font-bold text-luxury-dark">Total</span>
                <span className="text-lg font-bold text-luxury-dark">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <AnimatedButton variant="primary" size="lg" className="w-full" href="/checkout" onClick={onClose}>
                Checkout
                <ArrowRight className="h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton variant="outline" size="md" className="w-full" onClick={onClose}>
                Continue Shopping
              </AnimatedButton>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
