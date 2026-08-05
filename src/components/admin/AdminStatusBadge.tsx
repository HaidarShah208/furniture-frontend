"use client";

import { cn } from "@/lib/utils";
import type { StatusStyle } from "@/types/admin/common";

interface AdminStatusBadgeProps {
  status: string;
  styles: Record<string, StatusStyle>;
}

export default function AdminStatusBadge({ status, styles }: AdminStatusBadgeProps) {
  const s = styles[status] || { bg: "bg-gray-100", text: "text-gray-600" };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
      {status}
    </span>
  );
}
