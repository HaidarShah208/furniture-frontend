"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center">
                <div className="flex w-full items-center">
                  {index > 0 && (
                    <div className="h-px flex-1">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted || isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className={cn(
                          "h-full origin-left",
                          isCompleted || isActive ? "bg-luxury-gold" : "bg-luxury-border"
                        )}
                        style={{ height: 2 }}
                      />
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500",
                      isCompleted
                        ? "bg-luxury-gold text-white"
                        : isActive
                          ? "border-2 border-luxury-gold bg-white text-luxury-gold"
                          : "border-2 border-luxury-border bg-white text-luxury-muted"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="h-px flex-1">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="h-full origin-left bg-luxury-gold"
                        style={{ height: 2 }}
                      />
                    </div>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-[11px] font-medium uppercase tracking-wider transition-colors",
                    isCompleted || isActive ? "text-luxury-dark" : "text-luxury-muted"
                  )}
                >
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
