"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  Check,
  Clock,
} from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import AnimatedButton from "@/components/common/AnimatedButton";
import { getOrderById } from "@/data/account";
import { cn } from "@/lib/utils";

const statusStyles = {
  processing: { bg: "bg-amber-50", text: "text-amber-700", label: "Processing" },
  shipped: { bg: "bg-blue-50", text: "text-blue-700", label: "Shipped" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Delivered" },
  cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
};

function OrderDetailContent({ id }: { id: string }) {
  const order = getOrderById(id);

  if (!order) {
    return (
      <main>
        <Navbar />
        <section className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold text-luxury-dark">Order Not Found</h1>
            <p className="mb-6 text-sm text-luxury-muted">The order you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const s = statusStyles[order.status];

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="pb-16 pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <Link
            href="/account"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-luxury-muted transition-colors hover:text-luxury-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-luxury-dark lg:text-3xl">
                Order {order.id}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", s.bg, s.text)}>
                  {s.label}
                </span>
                <span className="text-sm text-luxury-muted">Placed on {order.date}</span>
              </div>
            </div>
            <AnimatedButton variant="outline" size="md" onClick={() => window.print()}>
              <FileText className="h-4 w-4" />
              Download Invoice
            </AnimatedButton>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left — Items + Tracking */}
            <div className="space-y-6 lg:col-span-2">
              {/* Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-luxury-border bg-white p-6"
              >
                <div className="mb-5 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-luxury-gold" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-dark">
                    Order Tracking
                  </h3>
                </div>

                <div className="relative">
                  {order.tracking.map((step, index) => {
                    const isLast = index === order.tracking.length - 1;
                    return (
                      <div key={step.label} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.12 }}
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                              step.completed
                                ? "bg-luxury-gold text-white"
                                : "border-2 border-luxury-border bg-white text-luxury-muted"
                            )}
                          >
                            {step.completed ? <Check className="h-4 w-4" /> : <Clock className="h-3.5 w-3.5" />}
                          </motion.div>
                          {!isLast && (
                            <div className={cn("w-0.5 flex-1 my-1", step.completed ? "bg-luxury-gold" : "bg-luxury-border")} />
                          )}
                        </div>
                        <div className={cn("pb-6", isLast && "pb-0")}>
                          <p className={cn("text-sm font-semibold", step.completed ? "text-luxury-dark" : "text-luxury-muted")}>
                            {step.label}
                          </p>
                          <p className="text-xs text-luxury-muted">
                            {step.date || "Pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-luxury-border bg-white p-6"
              >
                <div className="mb-5 flex items-center gap-2">
                  <Package className="h-5 w-5 text-luxury-gold" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-dark">
                    Items ({order.items.length})
                  </h3>
                </div>

                <div className="divide-y divide-luxury-border">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <Link href={`/products/${item.slug}`} className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </Link>
                      <div className="flex flex-1 items-start justify-between">
                        <div>
                          <Link href={`/products/${item.slug}`} className="text-sm font-bold text-luxury-dark transition-colors hover:text-luxury-gold">
                            {item.name}
                          </Link>
                          <p className="text-xs text-luxury-muted">{item.variant}</p>
                          <p className="text-xs text-luxury-muted">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-bold text-luxury-dark">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="rounded-2xl border border-luxury-border bg-white p-6"
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-luxury-dark">
                  Order Summary
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-luxury-secondary">Subtotal</span>
                    <span className="font-medium text-luxury-dark">${order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-emerald-600">Discount</span>
                      <span className="font-medium text-emerald-600">-${order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-luxury-secondary">Shipping</span>
                    <span className={cn("font-medium", order.shipping === 0 ? "text-emerald-600" : "text-luxury-dark")}>
                      {order.shipping === 0 ? "Free" : `$${order.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-secondary">Tax</span>
                    <span className="font-medium text-luxury-dark">${order.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-luxury-border pt-3">
                    <span className="font-bold text-luxury-dark">Total</span>
                    <span className="text-lg font-bold text-luxury-dark">${order.total.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl border border-luxury-border bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-luxury-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-dark">Shipping</h3>
                </div>
                <p className="text-sm text-luxury-secondary">{order.shippingAddress}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="rounded-2xl border border-luxury-border bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-luxury-gold" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-dark">Payment</h3>
                </div>
                <p className="text-sm text-luxury-secondary">{order.paymentMethod}</p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <OrderDetailContent id={id} />;
}
