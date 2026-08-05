"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { blogArticles } from "@/data/blog";

const articles = blogArticles.slice(0, 3);

export default function Blogs() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="From Our Journal"
          title="Latest Stories"
          description="Design inspiration, care guides, and behind-the-scenes glimpses into the world of luxury furniture."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" as const }}
            >
              <Link href={`/blog/${article.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-luxury-dark backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-luxury-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span>&middot;</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-snug tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-luxury-muted line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-luxury-gold transition-colors group-hover:text-luxury-gold-hover">
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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
