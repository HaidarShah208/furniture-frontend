"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedButton from "@/components/common/AnimatedButton";

const collectionImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
];

const collectionItemCounts = [48, 36, 52];

export default function FeaturedCollections() {
  const { t, direction } = useLanguage();

  const collections = [1, 2, 3].map((i, idx) => ({
    id: `collection-${i}`,
    name: t(`collections.collection${i}Name`),
    description: t(`collections.collection${i}Desc`),
    image: collectionImages[idx],
    itemCount: collectionItemCounts[idx],
  }));

  return (
    <section id="collections" className="py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("collections.subtitle")}
          title={t("collections.title")}
          description={t("collections.description")}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    {collection.itemCount} {t("collections.items")}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="px-1">
                <h3 className="mb-1.5 text-xl font-bold tracking-tight text-luxury-dark transition-colors duration-300 group-hover:text-luxury-gold">
                  {collection.name}
                </h3>
                <p className="text-sm leading-relaxed text-luxury-muted">
                  {collection.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <AnimatedButton variant="outline" size="lg" href="#collections">
            {t("collections.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </motion.div>
      </Container>
    </section>
  );
}
