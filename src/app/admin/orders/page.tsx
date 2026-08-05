"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminOrders } from "@/data/admin";

const statusOptions = ["All", "pending", "processing", "shipped", "delivered", "cancelled"];
const statusStyles: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700" },
  processing: { bg: "bg-blue-50", text: "text-blue-700" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-700" },
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = adminOrders;
    if (statusFilter !== "All") list = list.filter((o) => o.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [statusFilter, search]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-luxury-border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-40 bg-transparent text-sm text-luxury-dark outline-none placeholder:text-luxury-muted sm:w-56"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
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

      <div className="overflow-hidden rounded-xl border border-luxury-border bg-white">
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm text-luxury-muted">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const s = statusStyles[order.status];
                  return (
                    <tr key={order.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{order.id}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-secondary">{order.customer}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted sm:table-cell">{order.phone}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted md:table-cell">{order.city}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${order.total.toLocaleString()}</td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted lg:table-cell">{order.paymentMethod}</td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
                          {order.status}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted md:table-cell">{order.date}</td>
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-luxury-muted hover:text-luxury-gold">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
