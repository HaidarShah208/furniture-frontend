"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const messages = [
  "Free White-Glove Delivery Nationwide",
  "Custom Bespoke Furniture Available",
  "Premium Solid Wood Collection — New Arrivals",
  "Luxury Interior Design Consultation",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [dismissed, next]);

  if (dismissed) return null;

  return (
    <div className="relative z-[51] bg-luxury-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2">
        <div className="relative h-5 flex-1 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-xs font-medium tracking-wider text-white/80"
            >
              {messages[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 shrink-0 text-white/40 transition-colors hover:text-white/80"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
