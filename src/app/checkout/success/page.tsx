"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  ShoppingBag,
  Truck,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AnimatedButton from "@/components/common/AnimatedButton";

function generateOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "LUXE-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <Navbar />

      <section className="flex min-h-[80vh] items-center pb-20 pt-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-3xl font-bold tracking-tight text-luxury-dark lg:text-4xl"
            >
              Thank You for Your Order
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-base text-luxury-secondary"
            >
              Your order has been placed successfully. We&apos;ll send you a confirmation email shortly with your order details and tracking information.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10 rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-luxury-muted">
                Order Number
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold tracking-wider text-luxury-dark">
                  {orderId}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-luxury-border text-luxury-muted transition-colors hover:text-luxury-dark"
                  aria-label="Copy order number"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  title: "Confirmation Email",
                  desc: "Sent to your inbox",
                },
                {
                  icon: <Truck className="h-5 w-5" />,
                  title: "Shipping Updates",
                  desc: "Track in real-time",
                },
                {
                  icon: <FileText className="h-5 w-5" />,
                  title: "Invoice Ready",
                  desc: "Download below",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 rounded-xl border border-luxury-border bg-luxury-muted-bg/50 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-luxury-dark">{item.title}</span>
                  <span className="text-[11px] text-luxury-muted">{item.desc}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <AnimatedButton variant="primary" size="lg" href="/collections">
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg" onClick={() => window.print()}>
                <FileText className="h-4 w-4" />
                Download Invoice
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg" href="#">
                <Truck className="h-4 w-4" />
                Track Order
              </AnimatedButton>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
