"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle, Package, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetRecentOrdersQuery, useGetAllProductsQuery } from "@/redux/dashboard/apis/dashboard";
import { orderStatusStyles } from "@/types/admin/common";
import AdminCardSkeleton from "@/components/admin/AdminCardSkeleton";
import AdminTableSkeleton from "@/components/admin/AdminTableSkeleton";
import AdminErrorState from "@/components/admin/AdminErrorState";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";

export default function DashboardPage() {
  const { data: ordersData, isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useGetRecentOrdersQuery();
  const { data: productsData, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useGetAllProductsQuery();

  const orders = ordersData?.data || [];
  const products = productsData?.data || [];

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Orders", value: orders.filter((o) => o.orderStatus === "pending" || o.orderStatus === "processing").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Delivered Orders", value: orders.filter((o) => o.orderStatus === "delivered").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Products", value: products.length, icon: Package, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  if (ordersError || productsError) {
    return <AdminErrorState message="Failed to load dashboard data" onRetry={() => { refetchOrders(); refetchProducts(); }} />;
  }

  return (
    <div className="space-y-6">
      {ordersLoading || productsLoading ? (
        <AdminCardSkeleton />
      ) : (
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
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {ordersLoading ? (
          <div className="lg:col-span-2"><AdminTableSkeleton rows={5} columns={5} /></div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-xl border border-luxury-border bg-white lg:col-span-2"
          >
            <div className="flex items-center justify-between border-b border-luxury-border px-5 py-4">
              <h2 className="text-sm font-bold text-luxury-dark">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs font-semibold text-luxury-gold hover:text-luxury-gold-hover">View All</Link>
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
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{order.orderNumber}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-secondary">{order.customerName}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${Number(order.total).toLocaleString()}</td>
                      <td className="whitespace-nowrap px-5 py-3"><AdminStatusBadge status={order.orderStatus} styles={orderStatusStyles} /></td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-luxury-muted hover:text-luxury-gold"><Eye className="h-3.5 w-3.5" /></Link>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-luxury-muted">No orders yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {productsLoading ? (
          <div className="rounded-xl border border-luxury-border bg-white p-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-2.5 w-14 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
              {products.filter((p) => p.stock <= 3).length === 0 ? (
                <div className="p-5 text-center text-xs text-luxury-muted">All products stocked</div>
              ) : (
                products.filter((p) => p.stock <= 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-luxury-muted-bg text-xs font-bold text-luxury-muted">
                      {product.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
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
        )}
      </div>
    </div>
  );
}
