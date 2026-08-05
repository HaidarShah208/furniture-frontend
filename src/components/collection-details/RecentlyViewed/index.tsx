"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface RecentlyViewedProps {
  products: Product[];
}

export default function RecentlyViewed({ products }: RecentlyViewedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="border-t border-luxury-border py-20 lg:py-28">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            subtitle="Continue Browsing"
            title="Recently Viewed"
            description="Pick up where you left off with these recently explored pieces."
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-60 shrink-0 snap-start lg:w-64"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/30">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="256px"
                    />
                  </div>
                  <div className="p-3.5">
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                      {product.collection}
                    </span>
                    <h4 className="mb-1 text-sm font-bold tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold">
                      {product.name}
                    </h4>
                    <div className="mb-1.5 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-2.5 w-2.5",
                            i < Math.floor(product.rating)
                              ? "fill-luxury-gold text-luxury-gold"
                              : "fill-luxury-border text-luxury-border"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-luxury-dark">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] font-medium text-luxury-gold opacity-0 transition-all group-hover:opacity-100">
                        View <ArrowRight className="h-2.5 w-2.5" />
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
