"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Truck, CreditCard, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { ShippingData } from "./ShippingStep";
import type { DeliveryMethod } from "./DeliveryStep";
import type { PaymentData, PaymentMethod } from "./PaymentStep";

interface ReviewStepProps {
  shipping: ShippingData;
  delivery: DeliveryMethod;
  payment: PaymentData;
  paymentMethod: PaymentMethod;
  onPlaceOrder: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const deliveryLabels: Record<DeliveryMethod, string> = {
  standard: "Standard Delivery (5–7 days)",
  express: "Express Delivery (2–3 days)",
  "white-glove": "White-Glove Service (3–5 days)",
};

const paymentLabels: Record<PaymentMethod, string> = {
  card: "Credit / Debit Card",
  paypal: "PayPal",
  bank: "Bank Transfer",
};

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-luxury-border bg-white p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-luxury-gold/10 text-luxury-gold">
          {icon}
        </div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">{title}</h4>
      </div>
      <div className="text-sm leading-relaxed text-luxury-secondary">{children}</div>
    </div>
  );
}

export default function ReviewStep({
  shipping,
  delivery,
  payment,
  paymentMethod,
  onPlaceOrder,
  onBack,
  isSubmitting,
}: ReviewStepProps) {
  const { items, total } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">Review Your Order</h2>

      <div className="space-y-4">
        <InfoBlock icon={<MapPin className="h-4 w-4" />} title="Shipping Address">
          <p className="font-medium text-luxury-dark">
            {shipping.firstName} {shipping.lastName}
          </p>
          <p>{shipping.address}{shipping.apartment ? `, ${shipping.apartment}` : ""}</p>
          <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
          <p>{shipping.email} &middot; {shipping.phone}</p>
        </InfoBlock>

        <InfoBlock icon={<Truck className="h-4 w-4" />} title="Delivery Method">
          <p>{deliveryLabels[delivery]}</p>
        </InfoBlock>

        <InfoBlock icon={<CreditCard className="h-4 w-4" />} title="Payment">
          <p>{paymentLabels[paymentMethod]}</p>
          {paymentMethod === "card" && payment.cardNumber && (
            <p className="mt-1 font-medium text-luxury-dark">
              •••• •••• •••• {payment.cardNumber.replace(/\s/g, "").slice(-4)}
            </p>
          )}
        </InfoBlock>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
            Items ({items.length})
          </h4>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-luxury-dark">{item.product.name}</p>
                  <p className="text-[10px] text-luxury-muted">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-luxury-dark">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-luxury-muted transition-colors hover:text-luxury-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlaceOrder}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-luxury-gold px-10 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-luxury-gold-hover disabled:opacity-60"
        >
          <Lock className="h-4 w-4" />
          {isSubmitting ? "Processing..." : `Place Order — $${total.toLocaleString()}`}
        </motion.button>
      </div>
    </motion.div>
  );
}
