"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import AnimatedButton from "@/components/common/AnimatedButton";
import type { LuxeCollection } from "@/types/collection";

interface FeaturedCollectionProps {
  collection: LuxeCollection;
  reversed?: boolean;
}

export default function FeaturedCollection({
  collection,
  reversed = false,
}: FeaturedCollectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "direction-rtl" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className={reversed ? "lg:order-2" : ""}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            className={reversed ? "lg:order-1" : ""}
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Featured Collection
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-luxury-dark lg:text-4xl">
              {collection.name}
            </h2>
            <p className="mb-3 text-sm text-luxury-muted">
              {collection.year} &middot; Designed by {collection.designer}
            </p>
            <p className="mb-8 text-base leading-[1.8] text-luxury-secondary">
              {collection.story}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AnimatedButton
                variant="primary"
                size="lg"
                href={`/collections/${collection.slug}`}
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </AnimatedButton>
              <span className="text-sm text-luxury-muted">
                {collection.productCount} pieces
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
