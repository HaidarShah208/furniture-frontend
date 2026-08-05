"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Heart, ChevronDown, ArrowRight, GitCompare } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import AnimatedButton from "@/components/common/AnimatedButton";
import MegaMenu from "@/components/common/MegaMenu";
import SearchOverlay from "@/components/common/SearchOverlay";
import CartDrawer from "@/components/common/CartDrawer";
import WishlistDrawer from "@/components/common/WishlistDrawer";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "/", hasMega: false },
  { key: "collections", href: "/collections", hasMega: true },
  { key: "categories", href: "/categories", hasMega: false },
  { key: "about", href: "#about", hasMega: false },
  { key: "contact", href: "#contact", hasMega: false },
] as const;

const mobileCollectionLinks = [
  { label: "Modern Minimalist", href: "/collections/modern-minimalist" },
  { label: "Classic Heritage", href: "/collections/classic-heritage" },
  { label: "Urban Luxe", href: "/collections/urban-luxe" },
  { label: "Coastal Retreat", href: "/collections/coastal-retreat" },
  { label: "Art Deco Revival", href: "/collections/art-deco-revival" },
  { label: "Japandi Harmony", href: "/collections/japandi-harmony" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const { t, direction } = useLanguage();
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { totalItems: compareCount, drawerOpen: compareOpen, openDrawer: openCompare, closeDrawer: closeCompare } = useCompare();

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

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setMobileSubOpen(false);
  }, []);

  const iconClasses = cn(
    "rounded-lg p-2 transition-colors duration-300",
    isScrolled
      ? "text-luxury-text hover:text-luxury-dark"
      : "text-white/80 hover:text-white"
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
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

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.hasMega && setMegaMenuOpen(true)}
                onMouseLeave={() => item.hasMega && setMegaMenuOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                    isScrolled
                      ? "text-luxury-text hover:text-luxury-dark"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {t(`nav.${item.key}`)}
                  {item.hasMega && (
                    <ChevronDown className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )} />
                  )}
                  <span className="absolute bottom-0 left-4 right-4 h-px scale-x-0 bg-luxury-gold transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className={iconClasses}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
       
            <button
              onClick={() => setWishlistOpen(true)}
              className={cn(iconClasses, "relative")}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(iconClasses, "relative")}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="mx-1">
              <LanguageSwitcher light={!isScrolled} />
            </div>
            <AnimatedButton
              variant={isScrolled ? "primary" : "gold"}
              size="sm"
              href="/collections"
            >
              {t("nav.cta")}
            </AnimatedButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className={iconClasses}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(iconClasses, "relative")}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "rounded-lg p-2",
                isScrolled ? "text-luxury-dark" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaMenuOpen && (
            <MegaMenu onClose={() => setMegaMenuOpen(false)} />
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-55 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={closeMobile} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 right-0 top-0 w-full max-w-sm overflow-y-auto bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-luxury-border px-6 py-4">
                <Link
                  href="/"
                  className="text-2xl font-bold tracking-[0.15em] text-luxury-dark"
                  onClick={closeMobile}
                >
                  LUXE
                </Link>
                <button
                  onClick={closeMobile}
                  className="rounded-lg p-2 text-luxury-dark"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="px-6 py-6">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      {item.hasMega ? (
                        <div>
                          <button
                            onClick={() => setMobileSubOpen(!mobileSubOpen)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-luxury-dark transition-colors hover:bg-luxury-muted-bg"
                          >
                            {t(`nav.${item.key}`)}
                            <ChevronDown className={cn(
                              "h-4 w-4 text-luxury-muted transition-transform duration-200",
                              mobileSubOpen && "rotate-180"
                            )} />
                          </button>
                          <AnimatePresence>
                            {mobileSubOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 space-y-0.5 border-l border-luxury-border pl-4 pt-1 pb-2">
                                  <Link
                                    href="/collections"
                                    onClick={closeMobile}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-luxury-gold"
                                  >
                                    View All Collections
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </Link>
                                  {mobileCollectionLinks.map((link) => (
                                    <Link
                                      key={link.label}
                                      href={link.href}
                                      onClick={closeMobile}
                                      className="block rounded-lg px-3 py-2 text-sm text-luxury-text transition-colors hover:bg-luxury-muted-bg hover:text-luxury-gold"
                                    >
                                      {link.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="block rounded-lg px-3 py-3 text-base font-medium text-luxury-dark transition-colors hover:bg-luxury-muted-bg hover:text-luxury-gold"
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-1 border-t border-luxury-border pt-6">
                  <button
                    onClick={() => { closeMobile(); setWishlistOpen(true); }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-luxury-dark transition-colors hover:bg-luxury-muted-bg"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-luxury-muted" />
                      Wishlist
                    </span>
                    {wishlistCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => { closeMobile(); openCompare(); }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-luxury-dark transition-colors hover:bg-luxury-muted-bg"
                  >
                    <span className="flex items-center gap-3">
                      <GitCompare className="h-5 w-5 text-luxury-muted" />
                      Compare
                    </span>
                    {compareCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                        {compareCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <LanguageSwitcher />
                  <AnimatedButton variant="primary" size="lg" href="/collections" className="w-full">
                    {t("nav.cta")}
                  </AnimatedButton>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
