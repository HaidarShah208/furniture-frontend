"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import LuxuryInput from "@/components/common/Input";
import AnimatedButton from "@/components/common/AnimatedButton";

const socialLinks = [
  { name: "Facebook", initial: "Fb", href: "#" },
  { name: "Instagram", initial: "Ig", href: "#" },
  { name: "Twitter", initial: "Tw", href: "#" },
  { name: "Pinterest", initial: "Pt", href: "#" },
];

const collectionLinks = [
  { label: "Modern Minimalist", href: "/collections/modern-minimalist" },
  { label: "Classic Heritage", href: "/collections/classic-heritage" },
  { label: "Urban Luxe", href: "/collections/urban-luxe" },
  { label: "Coastal Retreat", href: "/collections/coastal-retreat" },
  { label: "Japandi Harmony", href: "/collections/japandi-harmony" },
];

export default function Footer() {
  const { t, direction } = useLanguage();

  return (
    <footer className="bg-luxury-dark" dir={direction}>
      

      <Container className="pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link
              href="/"
              className="mb-5 inline-block text-2xl font-bold tracking-[0.15em] text-white"
            >
              LUXE
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/50">
              {t("footer.description")}
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xs font-bold text-white/50 transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
                  aria-label={social.name}
                >
                  {social.initial}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {["home", "collections", "categories", "about", "contact"].map(
                (key) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : key === "collections" ? "/collections" : key === "categories" ? "/categories" : `#${key}`}
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-luxury-gold"
                    >
                      {t(`nav.${key}`)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {collectionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-luxury-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-white">
              {t("footer.getInTouch")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
                <span className="text-sm text-white/50">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-luxury-gold" />
                <a
                  href="tel:+15551234567"
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-luxury-gold"
                >
                  {t("footer.phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-luxury-gold" />
                <a
                  href="mailto:hello@luxefurniture.com"
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-luxury-gold"
                >
                  {t("footer.email")}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/30 transition-colors duration-300 hover:text-white/60"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 transition-colors duration-300 hover:text-white/60"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
