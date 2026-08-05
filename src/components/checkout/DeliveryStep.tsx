"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Zap, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeliveryMethod = "standard" | "express" | "white-glove";

interface DeliveryOption {
  id: DeliveryMethod;
  label: string;
  description: string;
  price: string;
  eta: string;
  icon: React.ReactNode;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "Professional delivery with basic setup",
    price: "Free",
    eta: "5–7 business days",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "Expedited shipping with room placement",
    price: "$150",
    eta: "2–3 business days",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "white-glove",
    label: "White-Glove Service",
    description: "Premium delivery with full assembly, placement, and packaging removal",
    price: "$350",
    eta: "3–5 business days",
    icon: <Zap className="h-5 w-5" />,
  },
];

interface DeliveryStepProps {
  selected: DeliveryMethod;
  onChange: (method: DeliveryMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DeliveryStep({ selected, onChange, onNext, onBack }: DeliveryStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">Delivery Method</h2>

      <div className="space-y-3">
        {deliveryOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <motion.button
              key={option.id}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onChange(option.id)}
              className={cn(
                "flex w-full items-start gap-4 rounded-xl border-2 p-5 text-left transition-all duration-300",
                isSelected
                  ? "border-luxury-gold bg-luxury-gold/5"
                  : "border-luxury-border bg-white hover:border-luxury-gold/50"
              )}
            >
              <div className={cn(
                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                isSelected ? "bg-luxury-gold text-white" : "bg-luxury-muted-bg text-luxury-muted"
              )}>
                {option.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-luxury-dark">{option.label}</span>
                  <span className={cn(
                    "text-sm font-bold",
                    option.price === "Free" ? "text-emerald-600" : "text-luxury-dark"
                  )}>
                    {option.price}
                  </span>
                </div>
                <p className="mt-1 text-xs text-luxury-secondary">{option.description}</p>
                <p className="mt-1.5 text-[11px] font-medium text-luxury-muted">{option.eta}</p>
              </div>
              <div className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                isSelected ? "border-luxury-gold" : "border-luxury-border"
              )}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2.5 w-2.5 rounded-full bg-luxury-gold"
                  />
                )}
              </div>
            </motion.button>
          );
        })}
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
          onClick={onNext}
          className="rounded-lg bg-luxury-dark px-10 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-luxury-gold"
        >
          Continue to Payment
        </motion.button>
      </div>
    </motion.div>
  );
}
