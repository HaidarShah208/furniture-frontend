"use client";

import { motion } from "framer-motion";
import { ArrowRight, Video } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import AnimatedButton from "@/components/common/AnimatedButton";

export default function CTA() {
  const { t, direction } = useLanguage();

  return (
    <section className="py-24 lg:py-32" dir={direction}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-luxury-dark px-6 py-16 text-center sm:px-12 md:py-24"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-luxury-gold blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-luxury-gold-hover blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              {t("cta.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-10 max-w-lg text-base text-white/60 md:text-lg"
            >
              {t("cta.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <AnimatedButton variant="gold" size="lg" href="#contact">
                {t("cta.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                href="#tour"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
              >
                <Video className="h-4 w-4" />
                {t("cta.secondaryCta")}
              </AnimatedButton>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
