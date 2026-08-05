"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, User, FileText, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdminOrderById } from "@/data/admin";

const allStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

function OrderDetailContent({ id }: { id: string }) {
  const order = getAdminOrderById(id);
  const [status, setStatus] = useState(order?.status || "pending");
  const [saved, setSaved] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <h2 className="mb-2 text-lg font-bold text-luxury-dark">Order not found</h2>
        <Link href="/admin/orders" className="mt-4 text-sm font-semibold text-luxury-gold hover:text-luxury-gold-hover">
          &larr; Back to Orders
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
              <div><span className="text-luxury-muted">Name:</span> <span className="ml-1 font-medium text-luxury-dark">{order.customer}</span></div>
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
            <p className="text-sm text-luxury-secondary">{order.shippingAddress}</p>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Ordered Products</h3>
            </div>
            <div className="divide-y divide-luxury-border">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-luxury-dark">{item.name}</p>
                    <p className="text-[10px] text-luxury-muted">{item.variant} &middot; Qty {item.quantity}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-luxury-dark">${(item.price * item.quantity).toLocaleString()}</span>
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
              <div className="flex justify-between"><span className="text-luxury-muted">Subtotal</span><span className="font-medium text-luxury-dark">${order.subtotal.toLocaleString()}</span></div>
              {order.discount > 0 && <div className="flex justify-between"><span className="text-emerald-600">Discount</span><span className="font-medium text-emerald-600">-${order.discount.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span className="text-luxury-muted">Shipping</span><span className={cn("font-medium", order.shipping === 0 ? "text-emerald-600" : "text-luxury-dark")}>{order.shipping === 0 ? "Free" : `$${order.shipping}`}</span></div>
              <div className="flex justify-between"><span className="text-luxury-muted">Tax</span><span className="font-medium text-luxury-dark">${order.tax.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-luxury-border pt-2"><span className="font-bold text-luxury-dark">Total</span><span className="text-lg font-bold text-luxury-dark">${order.total.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-luxury-gold" />
              <h3 className="text-sm font-bold text-luxury-dark">Payment</h3>
            </div>
            <p className="text-sm text-luxury-secondary">{order.paymentMethod}</p>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-luxury-dark">Update Status</h3>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value as typeof status); setSaved(false); }}
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
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-dark py-2.5 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
            >
              {saved ? <><Check className="h-4 w-4" /> Saved</> : "Save Changes"}
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
