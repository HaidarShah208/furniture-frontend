"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Badge from "@/components/common/Badge";

const projects = [
  { title: "The Ritz-Carlton Suite", type: "Hotel", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", pieces: 142 },
  { title: "Knightsbridge Residence", type: "Home", location: "London, UK", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", pieces: 38 },
  { title: "Skyline Penthouse", type: "Apartment", location: "New York, USA", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80", pieces: 56 },
  { title: "Foster & Partners HQ", type: "Office", location: "Singapore", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", pieces: 210 },
];

export default function InteriorProjects() {
  return (
    <section className="bg-luxury-dark py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Our Portfolio"
          title="Featured Projects"
          description="A selection of spaces where our furniture brings design visions to life."
          light
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />

                <div className="absolute left-4 top-4">
                  <Badge variant="gold">{project.type}</Badge>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="mb-1 text-base font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mb-3 text-xs text-white/60">
                    {project.location} &middot; {project.pieces} pieces
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-luxury-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View Project <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
