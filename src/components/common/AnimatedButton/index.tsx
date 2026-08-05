"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { AnimatedButtonProps } from "@/types/common";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-luxury-dark text-white hover:bg-luxury-gold border border-luxury-dark hover:border-luxury-gold",
  secondary:
    "bg-luxury-white text-luxury-dark hover:bg-luxury-dark hover:text-white border border-luxury-border hover:border-luxury-dark",
  outline:
    "bg-transparent text-luxury-dark hover:bg-luxury-dark hover:text-white border border-luxury-dark",
  gold: "bg-luxury-gold text-white hover:bg-luxury-gold-hover border border-luxury-gold hover:border-luxury-gold-hover",
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-all duration-500 ease-out",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type={type}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
