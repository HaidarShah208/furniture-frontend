"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { modalAnimation } from "@/lib/animations";
import type { DialogProps } from "@/types/common";

export default function Dialog({
  open,
  onClose,
  children,
  title,
  description,
  className,
}: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            {...modalAnimation.overlay}
            className="absolute inset-0 bg-black/50 overlay-blur"
            onClick={onClose}
          />
          <motion.div
            {...modalAnimation.content}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white luxury-shadow-xl",
              className
            )}
          >
            <div className="flex items-start justify-between p-6 pb-0">
              <div>
                {title && (
                  <h2 className="text-xl font-bold text-luxury-dark">{title}</h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-luxury-muted">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-luxury-muted transition-colors hover:text-luxury-dark"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
