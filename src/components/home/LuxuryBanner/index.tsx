"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import AnimatedButton from "@/components/common/AnimatedButton";

export default function LuxuryBanner() {
  const { t, direction } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-0" dir={direction}>
      <div className="relative min-h-[500px] md:min-h-[600px]">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <Image
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=80"
            alt="Luxury furniture showroom"
            fill
            className="object-cover scale-110"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-luxury-dark/70" />

        <div className="relative z-10 flex min-h-[500px] items-center justify-center px-4 md:min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-center"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
              {t("luxuryBanner.subtitle")}
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {t("luxuryBanner.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              {t("luxuryBanner.description")}
            </p>
            <AnimatedButton variant="gold" size="lg" href="#contact">
              {t("luxuryBanner.cta")}
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
