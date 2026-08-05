"use client";

import { motion } from "framer-motion";
import { CreditCard, ArrowLeft } from "lucide-react";
import LuxuryInput from "@/components/common/Input";
import { cn } from "@/lib/utils";

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export type PaymentMethod = "card" | "paypal" | "bank";

interface PaymentStepProps {
  method: PaymentMethod;
  onMethodChange: (m: PaymentMethod) => void;
  data: PaymentData;
  errors: Partial<Record<keyof PaymentData, string>>;
  onChange: (field: keyof PaymentData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "bank", label: "Bank Transfer" },
];

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function PaymentStep({
  method,
  onMethodChange,
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: PaymentStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">Payment</h2>

      <div className="mb-6 flex gap-2">
        {paymentMethods.map((pm) => (
          <button
            key={pm.id}
            type="button"
            onClick={() => onMethodChange(pm.id)}
            className={cn(
              "flex-1 rounded-lg border-2 px-4 py-3 text-xs font-semibold tracking-wide transition-all duration-300",
              method === pm.id
                ? "border-luxury-gold bg-luxury-gold/5 text-luxury-dark"
                : "border-luxury-border text-luxury-muted hover:border-luxury-gold/50"
            )}
          >
            {pm.label}
          </button>
        ))}
      </div>

      {method === "card" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <LuxuryInput
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            value={data.cardNumber}
            onChange={(e) => onChange("cardNumber", formatCardNumber(e.target.value))}
            error={errors.cardNumber}
            icon={<CreditCard className="h-4 w-4" />}
          />
          <LuxuryInput
            label="Cardholder Name"
            placeholder="John Smith"
            value={data.cardName}
            onChange={(e) => onChange("cardName", e.target.value)}
            error={errors.cardName}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <LuxuryInput
              label="Expiry Date"
              placeholder="MM/YY"
              value={data.expiry}
              onChange={(e) => onChange("expiry", formatExpiry(e.target.value))}
              error={errors.expiry}
            />
            <LuxuryInput
              label="CVC"
              placeholder="123"
              value={data.cvc}
              onChange={(e) => onChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
              error={errors.cvc}
            />
          </div>
        </motion.div>
      )}

      {method === "paypal" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-luxury-border bg-luxury-muted-bg/50 p-8 text-center"
        >
          <p className="text-sm font-semibold text-luxury-dark">PayPal</p>
          <p className="mt-2 text-xs text-luxury-secondary">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
        </motion.div>
      )}

      {method === "bank" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-luxury-border bg-luxury-muted-bg/50 p-8 text-center"
        >
          <p className="text-sm font-semibold text-luxury-dark">Bank Transfer</p>
          <p className="mt-2 text-xs text-luxury-secondary">
            Transfer details will be provided after order confirmation. Order ships upon payment confirmation.
          </p>
        </motion.div>
      )}

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
          onClick={onNext}
          className="rounded-lg bg-luxury-dark px-10 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-luxury-gold"
        >
          Review Order
        </motion.button>
      </div>
    </motion.div>
  );
}
