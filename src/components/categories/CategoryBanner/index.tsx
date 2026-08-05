"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "@/components/common/AnimatedButton";

export default function CategoryBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative min-h-112.5 md:min-h-137.5">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
            alt="Custom luxury furniture showroom"
            fill
            className="scale-110 object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-luxury-dark/70" />

        <div className="relative z-10 flex min-h-112.5 items-center justify-center px-4 md:min-h-137.5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="max-w-2xl text-center"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
              Interior Design Service
            </span>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Need Help Finding the Perfect Piece?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/60">
              Our design consultants can help you curate the ideal selection
              for any room. Complimentary for orders over $3,000.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <AnimatedButton variant="gold" size="lg" href="#contact">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                href="/collections"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
              >
                Browse Collections
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
