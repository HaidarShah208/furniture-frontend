import type { BadgeProps } from "@/types/common";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-luxury-bg text-luxury-text",
  gold: "bg-luxury-gold text-white",
  dark: "bg-luxury-dark text-white",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
