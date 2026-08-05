"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import type { LuxeCollection } from "@/types/collection";

interface CollectionHeaderProps {
  collection: LuxeCollection;
}

export default function CollectionHeader({ collection }: CollectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden lg:h-[55vh]">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      <Container className="relative z-10 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
            {collection.year} Collection &middot; {collection.designer}
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {collection.name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {collection.description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
