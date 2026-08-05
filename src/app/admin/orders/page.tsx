"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/redux/dashboard/apis/orders";
import { orderStatusStyles, type OrderStatus } from "@/types/admin/common";
import AdminTableSkeleton from "@/components/admin/AdminTableSkeleton";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminErrorState from "@/components/admin/AdminErrorState";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";

const statusOptions: (OrderStatus | "All")[] = ["All", "pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } = useGetOrdersQuery({
    page,
    limit: 20,
    search: search.trim() || undefined,
    status: statusFilter !== "All" ? statusFilter : undefined,
  });

  const orders = data?.data || [];
  const pagination = data?.pagination;

  if (error) return <AdminErrorState message="Failed to load orders" onRetry={refetch} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-luxury-border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search orders..."
            className="w-40 bg-transparent text-sm text-luxury-dark outline-none placeholder:text-luxury-muted sm:w-56"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition-colors",
                statusFilter === s
                  ? "bg-luxury-dark text-white"
                  : "border border-luxury-border text-luxury-text hover:border-luxury-dark"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <AdminTableSkeleton rows={8} columns={9} />
      ) : (
        <div className={cn("overflow-hidden rounded-xl border border-luxury-border bg-white", isFetching && "opacity-60")}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-luxury-border bg-luxury-muted-bg/30">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Order ID</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Customer</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted sm:table-cell">Phone</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted md:table-cell">City</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Total</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted lg:table-cell">Payment</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Status</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted md:table-cell">Date</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted" />
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border">
                {orders.length === 0 ? (
                  <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-luxury-muted">No orders found.</td></tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{order.orderNumber}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-secondary">{order.customerName}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted sm:table-cell">{order.phone}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted md:table-cell">{order.city}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${Number(order.total).toLocaleString()}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted capitalize lg:table-cell">{order.paymentMethod.replace("_", " ")}</td>
                      <td className="whitespace-nowrap px-5 py-3"><AdminStatusBadge status={order.orderStatus} styles={orderStatusStyles} /></td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-luxury-muted hover:text-luxury-gold"><Eye className="h-3.5 w-3.5" /></Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pagination && <AdminPagination pagination={pagination} onPageChange={setPage} loading={isFetching} />}
    </motion.div>
  );
}
