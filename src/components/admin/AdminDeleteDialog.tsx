"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface AdminDeleteDialogProps {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdminDeleteDialog({ open, title, description, loading, onConfirm, onCancel }: AdminDeleteDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            <button onClick={onCancel} className="absolute right-3 top-3 text-luxury-muted hover:text-luxury-dark">
              <X className="h-4 w-4" />
            </button>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-luxury-dark">{title}</h3>
            <p className="mb-5 text-xs text-luxury-muted">{description}</p>
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 rounded-lg border border-luxury-border px-4 py-2.5 text-xs font-semibold text-luxury-text transition-colors hover:border-luxury-dark"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
