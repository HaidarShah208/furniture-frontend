"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedButton from "@/components/common/AnimatedButton";
import Badge from "@/components/common/Badge";

const productImages = [
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80",
  "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
  "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
];

const productMeta = [
  { price: 2450, originalPrice: undefined, rating: 4.9, reviews: 128, badge: "new" },
  { price: 3890, originalPrice: 4200, rating: 4.8, reviews: 96, badge: "sale" },
  { price: 5200, originalPrice: undefined, rating: 5.0, reviews: 203, badge: "new" },
  { price: 1890, originalPrice: undefined, rating: 4.7, reviews: 67, badge: undefined },
];

export default function BestSellers() {
  const { t, direction } = useLanguage();

  const products = [1, 2, 3, 4].map((i, idx) => ({
    id: `product-${i}`,
    name: t(`bestSellers.product${i}Name`),
    description: t(`bestSellers.product${i}Desc`),
    image: productImages[idx],
    ...productMeta[idx],
  }));

  return (
    <section className="bg-luxury-white py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("bestSellers.subtitle")}
          title={t("bestSellers.title")}
          description={t("bestSellers.description")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {product.badge && (
                  <div className="absolute left-4 top-4">
                    <Badge variant={product.badge === "sale" ? "gold" : "dark"}>
                      {product.badge === "sale"
                        ? t("bestSellers.saleBadge")
                        : t("bestSellers.newBadge")}
                    </Badge>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-luxury-text opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-luxury-gold hover:text-white group-hover:opacity-100"
                  aria-label={t("bestSellers.addToWishlist")}
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/40 to-transparent p-4 transition-transform duration-500 group-hover:translate-y-0">
                  <AnimatedButton
                    variant="gold"
                    size="sm"
                    className="w-full"
                    href={`#product-${product.id}`}
                  >
                    {t("bestSellers.viewDetails")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </AnimatedButton>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-luxury-gold text-luxury-gold"
                          : "fill-luxury-border text-luxury-border"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-luxury-muted">
                    ({product.reviews})
                  </span>
                </div>
                <h3 className="mb-1 text-base font-bold tracking-tight text-luxury-dark">
                  {product.name}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-luxury-muted line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-luxury-dark">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-luxury-muted line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
