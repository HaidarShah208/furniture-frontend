"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Badge from "@/components/common/Badge";
import type { Category } from "@/types/category";

interface RecentlyAddedProps {
  categories: Category[];
}

export default function RecentlyAdded({ categories }: RecentlyAddedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const recent = categories.filter((c) => c.badge);

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 340, behavior: "smooth" });
    }
  };

  if (recent.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            subtitle="Fresh Additions"
            title="Recently Added"
            description="The latest categories added to our curated collection of luxury furniture."
            alignment="left"
          />
          <div className="mb-14 hidden gap-2 lg:flex">
            <button
              onClick={() => scroll(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-luxury-border text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory"
        >
          {recent.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-72 shrink-0 snap-start lg:w-80"
            >
              <Link href={`/categories/${cat.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/30 hover:luxury-shadow-hover">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="320px"
                    />
                    {cat.badge && (
                      <div className="absolute left-3.5 top-3.5">
                        <Badge variant="gold">{cat.badge}</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                      {cat.collection}
                    </span>
                    <h3 className="mb-1 text-sm font-bold tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold">
                      {cat.name}
                    </h3>
                    <p className="mb-3 text-xs leading-relaxed text-luxury-muted line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-luxury-border pt-3">
                      <span className="text-xs text-luxury-muted">
                        {cat.itemCount} pieces &middot; From ${cat.startingPrice.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-luxury-gold opacity-0 transition-all group-hover:opacity-100">
                        View <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
