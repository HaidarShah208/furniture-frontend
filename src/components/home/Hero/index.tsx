"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import AnimatedButton from "@/components/common/AnimatedButton";
import Container from "@/components/common/Container";

const statsAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.2 + i * 0.2, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const { t, direction } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  const stats = [
    { value: t("hero.stat1Value"), label: t("hero.stat1Label") },
    { value: t("hero.stat2Value"), label: t("hero.stat2Label") },
    { value: t("hero.stat3Value"), label: t("hero.stat3Label") },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      dir={direction}
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          alt="Luxury living room with designer furniture"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <Container className="relative z-10 py-32">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm"
          >
            {t("hero.subtitle")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <AnimatedButton variant="gold" size="lg" href="#collections">
              {t("hero.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              href="#about"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
            >
              <Play className="h-4 w-4" />
              {t("hero.secondaryCta")}
            </AnimatedButton>
          </motion.div>
        </div>

        <div className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/15 pt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsAnimation}
              className="text-center"
            >
              <p className="text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
