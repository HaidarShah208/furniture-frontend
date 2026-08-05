"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface AdminErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function AdminErrorState({ message = "Something went wrong", onRetry }: AdminErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 py-16 text-center">
      <AlertCircle className="mb-3 h-8 w-8 text-red-400" />
      <p className="mb-1 text-sm font-semibold text-luxury-dark">{message}</p>
      <p className="mb-4 text-xs text-luxury-muted">Please try again or contact support.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </button>
      )}
    </div>
  );
}
