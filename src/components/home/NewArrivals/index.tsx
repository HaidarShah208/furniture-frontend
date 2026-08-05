"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Badge from "@/components/common/Badge";

const newProducts = [
  { name: "Meridian Console", price: 1890, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", collection: "Urban Luxe", material: "Walnut & Brass", rating: 4.8 },
  { name: "Atelier Bed Frame", price: 4200, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", collection: "Classic Heritage", material: "European Oak", rating: 5.0 },
  { name: "Zen Coffee Table", price: 1290, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80", collection: "Japandi Harmony", material: "Ash & Stone", rating: 4.9 },
  { name: "Riviera Outdoor Set", price: 3650, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", collection: "Coastal Retreat", material: "Aged Teak", rating: 4.7 },
  { name: "Lumière Floor Lamp", price: 890, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80", collection: "Art Deco Revival", material: "Brass & Linen", rating: 4.6 },
];

export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 340, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            subtitle="Just Landed"
            title="New Arrivals"
            description="The latest additions to our curated world of luxury living."
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
          {newProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-72 shrink-0 snap-start lg:w-80"
            >
              <Link href="/categories" className="group block">
                <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/30 hover:luxury-shadow-hover">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="320px"
                    />
                    <div className="absolute left-3.5 top-3.5">
                      <Badge variant="gold">New</Badge>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.preventDefault()}
                      className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-text opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-luxury-gold hover:text-white group-hover:opacity-100"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <div className="p-4">
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                      {product.collection}
                    </span>
                    <h3 className="mb-1 text-sm font-bold tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold">
                      {product.name}
                    </h3>
                    <p className="mb-2 text-xs text-luxury-muted">{product.material}</p>
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-luxury-gold text-luxury-gold" : "fill-luxury-border text-luxury-border"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-luxury-border pt-3">
                      <span className="text-base font-bold text-luxury-dark">
                        ${product.price.toLocaleString()}
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
