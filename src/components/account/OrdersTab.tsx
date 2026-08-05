"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Package, Eye, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order } from "@/data/account";

interface OrdersTabProps {
  orders: Order[];
}

const statusStyles: Record<Order["status"], { bg: string; text: string; label: string }> = {
  processing: { bg: "bg-amber-50", text: "text-amber-700", label: "Processing" },
  shipped: { bg: "bg-blue-50", text: "text-blue-700", label: "Shipped" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Delivered" },
  cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
};

export default function OrdersTab({ orders }: OrdersTabProps) {
  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
          <Package className="h-7 w-7 text-luxury-muted" />
        </div>
        <h3 className="mb-1 text-base font-bold text-luxury-dark">No orders yet</h3>
        <p className="mb-6 text-sm text-luxury-muted">Start exploring our luxury collections</p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
        >
          Browse Collections
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
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order, index) => {
          const s = statusStyles[order.status];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="overflow-hidden rounded-xl border border-luxury-border bg-white transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-luxury-border px-5 py-3.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold tracking-wider text-luxury-dark">{order.id}</span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", s.bg, s.text)}>
                    {s.label}
                  </span>
                </div>
                <span className="text-xs text-luxury-muted">{order.date}</span>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-luxury-dark">{item.name}</p>
                        <p className="text-[10px] text-luxury-muted">{item.variant} &middot; Qty {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-luxury-border bg-luxury-muted-bg/30 px-5 py-3">
                <span className="text-sm font-bold text-luxury-dark">
                  ${order.total.toLocaleString()}
                </span>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-luxury-gold transition-colors hover:text-luxury-gold-hover"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
