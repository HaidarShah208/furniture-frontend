import { cn } from "@/lib/utils";
import type { SkeletonProps } from "@/types/common";

const roundedMap = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

export default function Skeleton({ className, rounded = "lg" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-luxury-border/60",
        roundedMap[rounded],
        className
      )}
    />
  );
}
