"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Badge from "@/components/common/Badge";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggleItem, isInWishlist } = useWishlist();

  const scroll = (direction: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    scrollRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            subtitle="You May Also Like"
            title="Related Products"
            alignment="left"
          />
          <div className="mb-12 hidden gap-2 md:flex md:mb-16">
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
          {products.map((product, index) => {
            const wishlisted = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-72 shrink-0 snap-start lg:w-80"
              >
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 luxury-shadow hover:border-luxury-gold/40 hover:luxury-shadow-hover">
                    <div className="relative aspect-4/5 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                      />
                      {product.badge && (
                        <div className="absolute left-3 top-3">
                          <Badge
                            variant={product.badge === "Sale" ? "gold" : "dark"}
                          >
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
                          wishlisted
                            ? "bg-luxury-gold text-white opacity-100"
                            : "bg-white/90 text-luxury-text opacity-0 hover:bg-luxury-gold hover:text-white group-hover:opacity-100"
                        )}
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={(e) => { e.preventDefault(); toggleItem(product); }}
                      >
                        <Heart className={cn("h-4 w-4", wishlisted && "fill-white")} />
                      </motion.button>
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                        <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-dark/90 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                          Quick View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-1.5 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < Math.floor(product.rating)
                                ? "fill-luxury-gold text-luxury-gold"
                                : "fill-luxury-border text-luxury-border"
                            )}
                          />
                        ))}
                        <span className="ml-1 text-xs text-luxury-muted">
                          ({product.reviews})
                        </span>
                      </div>
                      <h3 className="mb-1 text-sm font-bold text-luxury-dark">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-luxury-dark">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-luxury-muted line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
