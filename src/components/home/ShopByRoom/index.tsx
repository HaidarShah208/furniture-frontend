"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const rooms = [
  { name: "Living Room", count: 124, image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80", span: "md:col-span-2 md:row-span-2" },
  { name: "Bedroom", count: 98, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", span: "" },
  { name: "Dining Room", count: 76, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", span: "" },
  { name: "Office", count: 54, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", span: "" },
  { name: "Outdoor", count: 42, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", span: "" },
  { name: "Decor", count: 86, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80", span: "md:col-span-2" },
];

export default function ShopByRoom() {
  return (
    <section className="bg-luxury-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Browse by Space"
          title="Shop by Room"
          description="Find the perfect piece for every room, curated by our interior design team."
        />

        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-3">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" as const }}
              className={room.span}
            >
              <Link href="/categories" className="group block h-full">
                <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/70" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {room.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-white/60">
                        {room.count} pieces
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-luxury-gold" />
                    </div>
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
