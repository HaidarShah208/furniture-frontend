"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export default function OrderSummary() {
  const { items, subtotal, discount, couponApplied, shipping, tax, total } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-28 rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow"
    >
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-luxury-dark">
        Order Summary
      </h3>

      <div className="max-h-64 space-y-4 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-luxury-dark text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-luxury-dark line-clamp-1">
                  {item.product.name}
                </p>
                {item.variant && (
                  <p className="text-[10px] text-luxury-muted">{item.variant}</p>
                )}
              </div>
              <span className="text-xs font-bold text-luxury-dark">
                ${(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-luxury-border pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-luxury-secondary">Subtotal</span>
          <span className="font-medium text-luxury-dark">${subtotal.toLocaleString()}</span>
        </div>
        {couponApplied && discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Discount</span>
            <span className="font-medium text-emerald-600">-${discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-luxury-secondary">Shipping</span>
          <span className={cn("font-medium", shipping === 0 ? "text-emerald-600" : "text-luxury-dark")}>
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-luxury-secondary">Tax</span>
          <span className="font-medium text-luxury-dark">${tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-luxury-border pt-3">
          <span className="text-sm font-bold text-luxury-dark">Total</span>
          <span className="text-lg font-bold text-luxury-dark">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-luxury-border pt-5">
        <div className="flex items-center gap-2 text-xs text-luxury-secondary">
          <Lock className="h-3.5 w-3.5 text-luxury-gold" />
          SSL Encrypted Checkout
        </div>
        <div className="flex items-center gap-2 text-xs text-luxury-secondary">
          <ShieldCheck className="h-3.5 w-3.5 text-luxury-gold" />
          Buyer Protection Guarantee
        </div>
        <div className="flex items-center gap-2 text-xs text-luxury-secondary">
          <Truck className="h-3.5 w-3.5 text-luxury-gold" />
          White-Glove Delivery
        </div>
      </div>
    </motion.div>
  );
}
