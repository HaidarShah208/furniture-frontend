"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle, Package, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminOrders, adminProducts } from "@/data/admin";

const stats = [
  { label: "Total Orders", value: adminOrders.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Pending Orders", value: adminOrders.filter((o) => o.status === "pending" || o.status === "processing").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Delivered Orders", value: adminOrders.filter((o) => o.status === "delivered").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Total Products", value: adminProducts.length, icon: Package, color: "text-violet-600", bg: "bg-violet-50" },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700" },
  processing: { bg: "bg-blue-50", text: "text-blue-700" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-700" },
};

export default function DashboardPage() {
  const recentOrders = adminOrders.slice(0, 5);
  const lowStock = adminProducts.filter((p) => p.stock <= 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-luxury-border bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-luxury-muted">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-luxury-dark">{stat.value}</p>
              </div>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-luxury-border bg-white lg:col-span-2"
        >
          <div className="flex items-center justify-between border-b border-luxury-border px-5 py-4">
            <h2 className="text-sm font-bold text-luxury-dark">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-luxury-gold hover:text-luxury-gold-hover">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-luxury-border bg-luxury-muted-bg/30">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Order</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Customer</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Total</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted" />
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border">
                {recentOrders.map((order) => {
                  const s = statusStyles[order.status];
                  return (
                    <tr key={order.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{order.id}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-secondary">{order.customer}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${order.total.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-luxury-muted hover:text-luxury-gold">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-luxury-border bg-white"
        >
          <div className="flex items-center gap-2 border-b border-luxury-border px-5 py-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h2 className="text-sm font-bold text-luxury-dark">Low Stock</h2>
          </div>
          <div className="divide-y divide-luxury-border">
            {lowStock.length === 0 ? (
              <div className="p-5 text-center text-xs text-luxury-muted">All products stocked</div>
            ) : (
              lowStock.map((product) => (
                <div key={product.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold text-luxury-dark">{product.name}</p>
                    <p className={cn("text-[10px] font-semibold", product.stock === 0 ? "text-red-500" : "text-amber-600")}>
                      {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
