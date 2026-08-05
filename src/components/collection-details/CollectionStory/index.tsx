"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";

interface CollectionStoryProps {
  story: string;
  designer: string;
}

export default function CollectionStory({ story, designer }: CollectionStoryProps) {
  return (
    <section className="border-b border-luxury-border py-14 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
            The Story
          </span>
          <p className="text-lg leading-[1.9] text-luxury-secondary md:text-xl">
            {story}
          </p>
          <p className="mt-6 text-sm font-medium text-luxury-muted">
            &mdash; Designed by {designer}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
