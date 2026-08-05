"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "@/components/common/AnimatedButton";

export default function CollectionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative min-h-[450px] md:min-h-[550px]">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=80"
            alt="Bespoke luxury furniture design consultation"
            fill
            className="scale-110 object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-luxury-dark/65" />

        <div className="relative z-10 flex min-h-[450px] items-center justify-center px-4 md:min-h-[550px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="max-w-2xl text-center"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
              Bespoke Service
            </span>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/60">
              Our design team creates bespoke furniture tailored to your
              exact specifications. From material selection to final finish,
              every detail is crafted to your vision.
            </p>
            <AnimatedButton variant="gold" size="lg" href="#contact">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
