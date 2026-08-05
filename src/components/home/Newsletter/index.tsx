"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

export default function Newsletter() {
  const { t, direction } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-luxury-dark py-24 lg:py-32"
      dir={direction}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-luxury-gold blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-luxury-gold-hover blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          subtitle={t("newsletter.subtitle")}
          title={t("newsletter.title")}
          description={t("newsletter.description")}
          light
        />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            required
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-300 focus:border-luxury-gold/50 focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
            dir="ltr"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitted}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-luxury-gold px-7 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:bg-luxury-gold-hover disabled:opacity-70"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" />
                <span>Subscribed!</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("newsletter.button")}
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-center text-xs text-white/30"
        >
          {t("newsletter.privacy")}
        </motion.p>
      </Container>
    </section>
  );
}
