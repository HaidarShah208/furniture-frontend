"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, User, FileText, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "@/redux/dashboard/apis/orders";
import AdminFormSkeleton from "@/components/admin/AdminFormSkeleton";
import AdminErrorState from "@/components/admin/AdminErrorState";
import type { OrderStatus } from "@/types/admin/common";

const allStatuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

function OrderDetailContent({ id }: { id: string }) {
  const { data, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();
  const order = data?.data;
  const [status, setStatus] = useState<OrderStatus | "">("");

  if (isLoading) return <AdminFormSkeleton />;
  if (error || !order) return <AdminErrorState message="Order not found" onRetry={refetch} />;

  const currentStatus = status || order.orderStatus;

  const handleSave = async () => {
    try {
      await updateStatus({ id, data: { orderStatus: currentStatus as OrderStatus } }).unwrap();
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-sm text-luxury-muted hover:text-luxury-dark">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Customer Information</h3>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div><span className="text-luxury-muted">Name:</span> <span className="ml-1 font-medium text-luxury-dark">{order.customerName}</span></div>
              <div><span className="text-luxury-muted">Email:</span> <span className="ml-1 font-medium text-luxury-dark">{order.email}</span></div>
              <div><span className="text-luxury-muted">Phone:</span> <span className="ml-1 font-medium text-luxury-dark">{order.phone}</span></div>
              <div><span className="text-luxury-muted">City:</span> <span className="ml-1 font-medium text-luxury-dark">{order.city}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Shipping Address</h3>
            </div>
            <p className="text-sm text-luxury-secondary">{order.address}</p>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Ordered Products</h3>
            </div>
            <div className="divide-y divide-luxury-border">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-luxury-muted-bg text-xs font-bold text-luxury-muted">
                    {item.productName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-luxury-dark">{item.productName}</p>
                    <p className="text-[10px] text-luxury-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-luxury-dark">${(Number(item.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="rounded-xl border border-luxury-border bg-white p-5">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-luxury-gold" />
                <h3 className="text-sm font-bold text-luxury-dark">Notes</h3>
              </div>
              <p className="text-sm text-luxury-secondary">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-luxury-dark">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-luxury-muted">Subtotal</span><span className="font-medium text-luxury-dark">${Number(order.subtotal).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-luxury-muted">Shipping</span><span className={cn("font-medium", Number(order.shipping) === 0 ? "text-emerald-600" : "text-luxury-dark")}>{Number(order.shipping) === 0 ? "Free" : `$${Number(order.shipping).toLocaleString()}`}</span></div>
              <div className="flex justify-between border-t border-luxury-border pt-2"><span className="font-bold text-luxury-dark">Total</span><span className="text-lg font-bold text-luxury-dark">${Number(order.total).toLocaleString()}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Payment</h3>
            </div>
            <p className="text-sm capitalize text-luxury-secondary">{order.paymentMethod.replace("_", " ")}</p>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-luxury-dark">Update Status</h3>
            <select
              value={currentStatus}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full rounded-lg border border-luxury-border bg-white px-3 py-2.5 text-sm capitalize text-luxury-dark focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
            >
              {allStatuses.map((s) => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleSave}
              disabled={updating}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-dark py-2.5 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <OrderDetailContent id={id} />;
}
