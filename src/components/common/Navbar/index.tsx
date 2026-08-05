"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import AnimatedButton from "@/components/common/AnimatedButton";
import { cn } from "@/lib/utils";

const navKeys = ["home", "collections", "categories", "about", "contact"] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, direction } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-effect border-luxury-border/50 py-3"
          : "bg-transparent py-5"
      )}
      dir={direction}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold tracking-[0.15em] transition-colors duration-300",
            isScrolled ? "text-luxury-dark" : "text-white"
          )}
        >
          LUXE
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`#${key}`}
              className={cn(
                "group relative py-1 text-sm font-medium tracking-wide transition-colors duration-300",
                isScrolled
                  ? "text-luxury-text hover:text-luxury-dark"
                  : "text-white/80 hover:text-white"
              )}
            >
              {t(`nav.${key}`)}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className={cn(
              "rounded-lg p-2 transition-colors duration-300",
              isScrolled
                ? "text-luxury-text hover:text-luxury-dark"
                : "text-white/80 hover:text-white"
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "rounded-lg p-2 transition-colors duration-300",
              isScrolled
                ? "text-luxury-text hover:text-luxury-dark"
                : "text-white/80 hover:text-white"
            )}
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "relative rounded-lg p-2 transition-colors duration-300",
              isScrolled
                ? "text-luxury-text hover:text-luxury-dark"
                : "text-white/80 hover:text-white"
            )}
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <LanguageSwitcher light={!isScrolled} />
          <AnimatedButton
            variant={isScrolled ? "primary" : "gold"}
            size="sm"
            href="#collections"
          >
            {t("nav.cta")}
          </AnimatedButton>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "rounded-lg p-2 lg:hidden",
            isScrolled ? "text-luxury-dark" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-white lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-luxury-border px-4 py-4">
              <Link
                href="/"
                className="text-2xl font-bold tracking-[0.15em] text-luxury-dark"
                onClick={() => setIsMobileOpen(false)}
              >
                LUXE
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg p-2 text-luxury-dark"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {navKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`#${key}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-medium tracking-wide text-luxury-dark transition-colors hover:text-luxury-gold"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <LanguageSwitcher />
                <AnimatedButton variant="primary" size="lg" href="#collections">
                  {t("nav.cta")}
                </AnimatedButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
