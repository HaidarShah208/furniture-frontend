"use client";

import { motion } from "framer-motion";
import { TreePine, Hand, Paintbrush, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const steps = [
  { icon: TreePine, title: "Wood Selection", description: "We source sustainably harvested hardwoods from certified forests across three continents, selecting only the finest grain patterns.", year: "Step 01" },
  { icon: Hand, title: "Hand Crafting", description: "Master artisans with decades of experience shape each piece using traditional joinery techniques passed down through generations.", year: "Step 02" },
  { icon: Paintbrush, title: "Premium Finishing", description: "Multiple layers of hand-applied finish bring out the natural beauty of the wood, creating a depth and warmth no machine can replicate.", year: "Step 03" },
  { icon: ShieldCheck, title: "Quality Inspection", description: "Every piece undergoes a rigorous 47-point quality inspection before earning the LUXE mark of excellence.", year: "Step 04" },
  { icon: Truck, title: "White-Glove Delivery", description: "Our specialist team delivers, assembles, and places your furniture with meticulous care, removing all packaging.", year: "Step 05" },
];

export default function Craftsmanship() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="The Art of Making"
          title="Our Craftsmanship Journey"
          description="From sustainably sourced raw materials to your living room — a journey of precision, passion, and pride."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-luxury-border lg:left-1/2 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
                  className="relative lg:flex lg:items-center lg:py-10"
                >
                  <div className={`lg:w-1/2 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:order-2 lg:pl-16"}`}>
                    <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold">
                      {step.year}
                    </span>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-luxury-dark lg:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-luxury-secondary">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute left-6 top-0 hidden -translate-x-1/2 lg:static lg:flex lg:w-0 lg:translate-x-0 lg:items-center lg:justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-luxury-gold bg-white luxury-shadow"
                    >
                      <Icon className="h-6 w-6 text-luxury-gold" />
                    </motion.div>
                  </div>

                  <div className={`hidden lg:block lg:w-1/2 ${isLeft ? "lg:order-2 lg:pl-16" : "lg:pr-16 lg:text-right"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
