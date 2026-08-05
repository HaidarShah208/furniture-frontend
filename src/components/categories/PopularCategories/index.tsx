"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import type { Category } from "@/types/category";

interface PopularCategoriesProps {
  categories: Category[];
}

export default function PopularCategories({ categories }: PopularCategoriesProps) {
  const popular = [...categories]
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, 4);

  return (
    <section className="bg-luxury-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Most Explored"
          title="Popular Categories"
          description="Our most sought-after collections, curated by customer preference and design excellence."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {popular.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
            >
              <Link href={`/categories/${cat.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/75" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="mb-1 text-lg font-bold text-white">
                      {cat.name}
                    </h3>
                    <p className="mb-3 text-xs text-white/60">
                      {cat.itemCount} pieces
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-luxury-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-luxury-gold transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
