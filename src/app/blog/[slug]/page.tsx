"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  LinkIcon,
  ArrowRight,
  Share2,
} from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import { getArticleBySlug, getRelatedArticles } from "@/data/blog";

function BlogDetailContent({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main>
        <Navbar />
        <section className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold text-luxury-dark">Article Not Found</h1>
            <p className="mb-6 text-sm text-luxury-muted">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const related = getRelatedArticles(slug);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="bg-luxury-muted-bg pt-28 pb-12 lg:pt-32">
        <Container>
          <Breadcrumb
            items={[
              { label: "Journal", href: "/blog" },
              { label: article.title },
            ]}
          />
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-luxury-muted transition-colors hover:text-luxury-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>
        </Container>
      </section>

      {/* Article Header */}
      <section className="pb-8 bg-luxury-muted-bg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-luxury-gold/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-luxury-gold">
              {article.category}
            </span>
            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-luxury-dark md:text-4xl lg:text-[44px]">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-luxury-muted">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" sizes="32px" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-luxury-dark">{article.author.name}</p>
                  <p className="text-[10px] text-luxury-muted">{article.author.role}</p>
                </div>
              </div>
              <span className="hidden sm:inline text-luxury-border">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {article.readTime}
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="mt-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto max-w-4xl overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-video">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-6"
            >
              {article.content.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed text-luxury-secondary ${i === 0 ? "text-lg font-medium text-luxury-dark" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Tags */}
            <div className="mt-10 border-t border-luxury-border pt-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-luxury-border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-luxury-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-3">
              <Share2 className="h-4 w-4 text-luxury-muted" />
              <span className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">Share</span>
              <div className="flex gap-2">
                {[
                  { label: "Fb", name: "Facebook", url: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
                  { label: "Tw", name: "Twitter", url: `https://twitter.com/intent/tweet?url=${shareUrl}` },
                  { label: "In", name: "LinkedIn", url: `https://linkedin.com/shareArticle?url=${shareUrl}` },
                ].map(({ label, name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-border text-[10px] font-bold text-luxury-muted transition-colors hover:border-luxury-gold hover:text-luxury-gold"
                    aria-label={`Share on ${name}`}
                  >
                    {label}
                  </a>
                ))}
                <button
                  onClick={handleCopyLink}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-border text-luxury-muted transition-colors hover:border-luxury-gold hover:text-luxury-gold"
                  aria-label="Copy link"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-luxury-border py-16 lg:py-24">
          <Container>
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-luxury-dark">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((rel, index) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${rel.slug}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-luxury-border bg-white transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover">
                      <div className="relative aspect-16/10 overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-luxury-dark backdrop-blur-sm">
                            {rel.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs text-luxury-muted">
                          <Calendar className="h-3 w-3" /> {rel.date}
                          <span>&middot;</span>
                          {rel.readTime}
                        </div>
                        <h3 className="mb-2 text-base font-bold text-luxury-dark transition-colors group-hover:text-luxury-gold">
                          {rel.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-luxury-gold">
                          Read More
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <BlogDetailContent slug={slug} />;
}
