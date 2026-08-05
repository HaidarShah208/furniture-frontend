"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";

export default function CategoriesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative flex h-[50vh] min-h-[400px] items-center overflow-hidden lg:h-[60vh]">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          alt="Luxury furniture showroom"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold"
          >
            Curated Collections
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Explore our expertly curated collections of handcrafted luxury furniture,
            designed to transform every space in your home.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
