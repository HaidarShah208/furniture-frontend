"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";

export default function BrandPhilosophy() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Our Philosophy
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight text-luxury-dark md:text-4xl lg:text-5xl">
              Where Craftsmanship
              <br />
              Meets Soul
            </h2>
            <div className="space-y-5">
              <p className="text-lg leading-[1.9] text-luxury-secondary">
                Every piece we create begins as a conversation between material
                and maker. We believe furniture should do more than fill a
                space &mdash; it should transform it, telling a story of heritage,
                artistry, and intentional design.
              </p>
              <p className="text-base leading-[1.8] text-luxury-muted">
                Founded on the principle that luxury is felt, not merely seen,
                our collections bridge the timeless traditions of European
                master craftsmen with the evolving sensibilities of modern living.
                Each joint, each curve, each finish is a deliberate act of care.
              </p>
            </div>
            <div className="mt-10 flex gap-12">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold text-luxury-dark"
                >
                  1998
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Established
                </p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-bold text-luxury-dark"
                >
                  12
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Countries
                </p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-3xl font-bold text-luxury-dark"
                >
                  40+
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Artisans
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80"
                alt="Master craftsman at work in our atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow-lg lg:block">
              <p className="text-sm font-bold text-luxury-dark">
                &ldquo;We don&apos;t build furniture.
              </p>
              <p className="text-sm font-bold text-luxury-dark">
                We build legacies.&rdquo;
              </p>
              <p className="mt-2 text-xs text-luxury-muted">
                &mdash; Alessandro Moretti, Founder
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
