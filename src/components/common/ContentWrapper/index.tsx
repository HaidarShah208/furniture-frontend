import { cn } from "@/lib/utils";
import { containerWidth } from "@/lib/design-tokens";
import type { ContentWrapperProps } from "@/types/common";

export default function ContentWrapper({
  children,
  className,
  maxWidth = "default",
}: ContentWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerWidth[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}
