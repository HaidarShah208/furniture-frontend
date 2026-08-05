"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Ruler, Hammer, Package, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedButton from "@/components/common/AnimatedButton";

const processSteps = [
  { icon: MessageSquare, title: "Consultation", description: "Share your vision with our design team in a private showroom or virtual session." },
  { icon: Palette, title: "Material Selection", description: "Choose from hundreds of premium materials, finishes, and fabric swatches." },
  { icon: Ruler, title: "Custom Design", description: "Our designers create detailed 3D renderings tailored to your exact specifications." },
  { icon: Hammer, title: "Artisan Crafting", description: "Master craftsmen bring your piece to life using time-honored techniques." },
  { icon: Package, title: "Delivery & Placement", description: "White-glove delivery with professional placement in your chosen room." },
];

export default function Customization() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Made for You"
          title="The Bespoke Process"
          description="From initial concept to final placement — your custom furniture journey, simplified."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                className="group relative rounded-2xl border border-luxury-border bg-white p-6 text-center transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <div className="mx-auto mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-muted-bg transition-colors duration-500 group-hover:bg-luxury-gold/10">
                  <Icon className="h-5 w-5 text-luxury-gold" />
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-tight text-luxury-dark">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-luxury-muted">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <AnimatedButton variant="primary" size="lg" href="#contact">
            Start Your Custom Order
            <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </motion.div>
      </Container>
    </section>
  );
}
