"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import SectionHeading from "@/components/common/SectionHeading";
import { blogArticles } from "@/data/blog";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(blogArticles.map((a) => a.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogArticles.find((a) => a.featured);
  const filtered =
    activeCategory === "All"
      ? blogArticles.filter((a) => !a.featured)
      : blogArticles.filter((a) => a.category === activeCategory && !a.featured);

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="bg-luxury-muted-bg pt-28 pb-16 lg:pt-32 lg:pb-20">
        <Container>
          <Breadcrumb items={[{ label: "Journal" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Our Journal
            </span>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-luxury-dark md:text-4xl lg:text-5xl">
              Stories & Inspiration
            </h1>
            <p className="text-base leading-relaxed text-luxury-muted md:text-lg">
              Design insights, care guides, and behind-the-scenes glimpses into the world of luxury furniture craftsmanship.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 lg:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-96">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-luxury-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
                        {featured.category}
                      </span>
                      <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-luxury-dark transition-colors group-hover:text-luxury-gold lg:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mb-6 text-sm leading-relaxed text-luxury-muted line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="mb-6 flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image src={featured.author.avatar} alt={featured.author.name} fill className="object-cover" sizes="32px" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-luxury-dark">{featured.author.name}</p>
                          <p className="text-[10px] text-luxury-muted">{featured.date} &middot; {featured.readTime}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-luxury-gold transition-colors group-hover:text-luxury-gold-hover">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Category Filter + Grid */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading
            subtitle="Latest Articles"
            title="From the Journal"
          />

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300",
                  activeCategory === cat
                    ? "bg-luxury-dark text-white"
                    : "border border-luxury-border text-luxury-text hover:border-luxury-dark hover:text-luxury-dark"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-luxury-muted">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${article.slug}`} className="group block h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover">
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
                      <div className="flex flex-1 flex-col p-6">
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
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-luxury-muted line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-luxury-muted" />
                            <span className="text-[11px] font-medium text-luxury-secondary">{article.author.name}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-luxury-gold transition-colors group-hover:text-luxury-gold-hover">
                            Read
                            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}
