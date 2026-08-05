"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Package, FileText } from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Breadcrumb from "@/components/product/Breadcrumb";
import { products } from "@/data/products";
import { blogArticles } from "@/data/blog";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const q = query.trim().toLowerCase();

  const productResults = useMemo(() => {
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [q]);

  const blogResults = useMemo(() => {
    if (!q) return [];
    return blogArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [q]);

  const totalResults = productResults.length + blogResults.length;

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="pb-16 pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <Breadcrumb items={[{ label: "Search" }]} />

          <div className="mx-auto mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-luxury-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search furniture, collections, articles..."
                className="w-full rounded-xl border border-luxury-border bg-white py-4 pl-12 pr-4 text-base text-luxury-dark outline-none transition-all duration-300 placeholder:text-luxury-muted focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30"
                autoFocus
              />
            </div>
            {q && (
              <p className="mt-3 text-sm text-luxury-muted">
                {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          {q && totalResults === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <Search className="mb-4 h-12 w-12 text-luxury-border" />
              <h2 className="mb-2 text-xl font-bold text-luxury-dark">No results found</h2>
              <p className="mb-6 max-w-md text-sm text-luxury-muted">
                Try different keywords or browse our collections for inspiration.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
              >
                Browse Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}

          {productResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-10 max-w-4xl"
            >
              <div className="mb-5 flex items-center gap-2">
                <Package className="h-4 w-4 text-luxury-gold" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                  Products ({productResults.length})
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {productResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-luxury-border bg-white p-4 transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-luxury-dark transition-colors group-hover:text-luxury-gold truncate">{product.name}</p>
                        <p className="text-xs text-luxury-muted">{product.collection} &middot; {product.material}</p>
                        <p className="mt-1 text-sm font-bold text-luxury-gold">${product.price.toLocaleString()}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-luxury-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {blogResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mx-auto mt-10 max-w-4xl"
            >
              <div className="mb-5 flex items-center gap-2">
                <FileText className="h-4 w-4 text-luxury-gold" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                  Articles ({blogResults.length})
                </h3>
              </div>
              <div className="space-y-4">
                {blogResults.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-luxury-border bg-white p-4 transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-luxury-gold">{article.category}</span>
                        <p className="text-sm font-bold text-luxury-dark transition-colors group-hover:text-luxury-gold truncate">{article.title}</p>
                        <p className="text-xs text-luxury-muted line-clamp-1">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-luxury-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
