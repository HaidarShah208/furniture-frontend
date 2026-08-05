"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProductFeaturesProps {
  features: string[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-luxury-dark">
        Key Features
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-start gap-2.5"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-luxury-gold/10">
              <Check className="h-3 w-3 text-luxury-gold" />
            </div>
            <span className="text-sm leading-relaxed text-luxury-secondary">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
