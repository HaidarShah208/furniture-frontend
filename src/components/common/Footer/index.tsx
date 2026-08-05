"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Pinterest", href: "#" },
];

export default function Footer() {
  const { t, direction } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-luxury-dark pt-20 pb-8" dir={direction}>
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="mb-6 inline-block text-2xl font-bold tracking-[0.15em] text-white"
            >
              LUXE
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xs font-bold text-white/50 transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
                  aria-label={social.name}
                >
                  {social.name.charAt(0)}
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
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {["home", "collections", "categories", "about", "contact"].map(
                (key) => (
                  <li key={key}>
                    <Link
                      href={`#${key}`}
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.customerCare")}
            </h4>
            <ul className="space-y-3">
              {["contactUs", "faq", "shipping", "warranty", "careGuide"].map(
                (key) => (
                  <li key={key}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-luxury-gold"
                    >
                      {t(`footer.${key}`)}
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
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

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold text-white shadow-lg transition-colors duration-300 hover:bg-luxury-gold-hover"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
