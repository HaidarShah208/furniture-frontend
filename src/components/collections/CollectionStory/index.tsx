"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";

export default function CollectionStory() {
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
              The Story Behind
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight text-luxury-dark md:text-4xl lg:text-5xl">
              Collections Born
              <br />
              from Heritage
            </h2>
            <div className="space-y-5">
              <p className="text-lg leading-[1.9] text-luxury-secondary">
                Every LUXE collection begins with a narrative &mdash; a place, an era,
                a philosophy that inspires each design decision. Our creative
                directors travel the world seeking the stories that deserve to
                be told through furniture.
              </p>
              <p className="text-base leading-[1.8] text-luxury-muted">
                From the minimalist temples of Kyoto to the grand ateliers of
                Milan, from the weathered harbors of the Mediterranean to the
                sleek studios of Copenhagen &mdash; each collection carries the
                soul of its origin into your home.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-8">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold text-luxury-dark"
                >
                  6
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Collections
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
                  220+
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Pieces
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
                  8
                </motion.p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-luxury-muted">
                  Designers
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
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80"
                alt="Luxury furniture collection design process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow-lg lg:block">
              <p className="text-sm font-bold text-luxury-dark">
                &ldquo;Design is not what you see,
              </p>
              <p className="text-sm font-bold text-luxury-dark">
                but what you feel.&rdquo;
              </p>
              <p className="mt-2 text-xs text-luxury-muted">
                &mdash; Our Design Philosophy
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
