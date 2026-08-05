"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const materials = [
  { name: "Solid Wood", description: "Hand-selected hardwoods from certified sustainable forests", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { name: "Italian Marble", description: "Calacatta and Carrara marble quarried from the Apuan Alps", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80" },
  { name: "Full-Grain Leather", description: "Premium Italian tanneries providing buttery-soft hides", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80" },
  { name: "European Linen", description: "Belgian flax woven into timeless, breathable fabrics", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=80" },
  { name: "Brushed Metal", description: "Brass, steel, and iron finished by hand for unique patina", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80" },
  { name: "Tempered Glass", description: "Ultra-clear, edge-polished glass for sculptural transparency", image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80" },
];

export default function Materials() {
  return (
    <section className="bg-luxury-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Sourced with Intention"
          title="Premium Materials"
          description="We travel the world to find materials worthy of your home — each selected for beauty, durability, and character."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" as const }}
              className="group overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover"
            >
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-base font-bold tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold">
                  {material.name}
                </h3>
                <p className="text-sm leading-relaxed text-luxury-muted">
                  {material.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
