"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { drawerSlideRight, drawerSlideLeft, modalAnimation } from "@/lib/animations";
import type { DrawerProps } from "@/types/common";

export default function Drawer({
  open,
  onClose,
  children,
  side = "right",
  title,
  className,
}: DrawerProps) {
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

  const slideAnim = side === "right" ? drawerSlideRight : drawerSlideLeft;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            {...modalAnimation.overlay}
            className="absolute inset-0 bg-black/40 overlay-blur"
            onClick={onClose}
          />
          <motion.div
            {...slideAnim}
            className={cn(
              "absolute top-0 bottom-0 flex w-full max-w-md flex-col bg-white shadow-2xl",
              side === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-luxury-border px-6 py-4">
                <h2 className="text-lg font-bold text-luxury-dark">{title}</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-luxury-text transition-colors hover:text-luxury-dark"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
