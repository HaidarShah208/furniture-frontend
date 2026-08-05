"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const categoryData = [
  {
    key: "livingRoom",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    count: 124,
  },
  {
    key: "bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    count: 98,
  },
  {
    key: "dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    count: 76,
  },
  {
    key: "office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    count: 54,
  },
  {
    key: "outdoor",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    count: 42,
  },
];

export default function Categories() {
  const { t, direction } = useLanguage();

  return (
    <section id="categories" className="bg-luxury-white py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("categories.subtitle")}
          title={t("categories.title")}
          description={t("categories.description")}
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categoryData.map((cat, index) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={cat.image}
                  alt={t(`categories.${cat.key}`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-5">
                  <h3 className="text-center text-sm font-bold tracking-wide text-white sm:text-base">
                    {t(`categories.${cat.key}`)}
                  </h3>
                  <span className="mt-1 text-xs text-white/60">
                    {cat.count} {t("collections.items")}
                  </span>
                </div>
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-luxury-gold transition-all duration-500 group-hover:w-3/4" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
