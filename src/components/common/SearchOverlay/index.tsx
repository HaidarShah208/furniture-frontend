"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { blogArticles } from "@/data/blog";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const recentSearches = ["Aria Lounge Chair", "Oak dining table", "Velvet sofa"];
const trendingSearches = ["Modern Minimalist", "Marble tables", "Luxury bedroom", "Solid Wood", "Italian Leather"];

const popularProducts = [
  {
    name: "Aria Lounge Chair",
    price: 2450,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60",
    slug: "aria-lounge-chair",
  },
  {
    name: "Luna Dining Table",
    price: 3890,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200&q=60",
    slug: "luna-dining-table",
  },
  {
    name: "Serene Sofa",
    price: 5200,
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=200&q=60",
    slug: "serene-sofa-collection",
  },
];

const popularCollections = [
  { name: "Modern Minimalist", slug: "modern-minimalist" },
  { name: "Classic Heritage", slug: "classic-heritage" },
  { name: "Urban Luxe", slug: "urban-luxe" },
];

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onClose]);

  const productResults = useMemo(() => {
    if (!debouncedQuery) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(debouncedQuery) ||
        p.category.toLowerCase().includes(debouncedQuery) ||
        p.material.toLowerCase().includes(debouncedQuery) ||
        p.collection.toLowerCase().includes(debouncedQuery)
    ).slice(0, 4);
  }, [debouncedQuery]);

  const blogResults = useMemo(() => {
    if (!debouncedQuery) return [];
    return blogArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(debouncedQuery) ||
        a.category.toLowerCase().includes(debouncedQuery) ||
        a.tags.some((t) => t.toLowerCase().includes(debouncedQuery))
    ).slice(0, 3);
  }, [debouncedQuery]);

  const hasResults = productResults.length > 0 || blogResults.length > 0;
  const isSearching = debouncedQuery.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-60 flex flex-col bg-white"
        >
          <div className="border-b border-luxury-border">
            <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-5 sm:px-6">
              <Search className="h-5 w-5 shrink-0 text-luxury-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search furniture, collections, materials..."
                className="flex-1 bg-transparent text-lg text-luxury-dark outline-none placeholder:text-luxury-muted"
              />
              {query && query !== debouncedQuery && (
                <Loader2 className="h-4 w-4 animate-spin text-luxury-muted" />
              )}
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-luxury-muted transition-colors hover:text-luxury-dark"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {hasResults ? (
                      <div className="space-y-10">
                        {productResults.length > 0 && (
                          <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                              Products ({productResults.length})
                            </h3>
                            <div className="space-y-3">
                              {productResults.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/products/${product.slug}`}
                                  onClick={onClose}
                                  className="group flex items-center gap-4 rounded-xl border border-luxury-border p-3 transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
                                >
                                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-luxury-dark transition-colors group-hover:text-luxury-gold truncate">{product.name}</p>
                                    <p className="text-xs text-luxury-muted">{product.collection} &middot; {product.material}</p>
                                  </div>
                                  <span className="shrink-0 text-sm font-bold text-luxury-gold">${product.price.toLocaleString()}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {blogResults.length > 0 && (
                          <div>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                              Articles ({blogResults.length})
                            </h3>
                            <div className="space-y-3">
                              {blogResults.map((article) => (
                                <Link
                                  key={article.slug}
                                  href={`/blog/${article.slug}`}
                                  onClick={onClose}
                                  className="group flex items-center gap-4 rounded-xl border border-luxury-border p-3 transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
                                >
                                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-luxury-dark transition-colors group-hover:text-luxury-gold truncate">{article.title}</p>
                                    <p className="text-xs text-luxury-muted">{article.category} &middot; {article.readTime}</p>
                                  </div>
                                  <ArrowRight className="h-4 w-4 shrink-0 text-luxury-muted opacity-0 transition-all group-hover:opacity-100" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="border-t border-luxury-border pt-4">
                          <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-luxury-gold transition-colors hover:text-luxury-gold-hover"
                          >
                            View all results for &ldquo;{query}&rdquo;
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-16 text-center">
                        <Search className="mb-4 h-10 w-10 text-luxury-border" />
                        <h3 className="mb-1 text-base font-bold text-luxury-dark">No results found</h3>
                        <p className="text-sm text-luxury-muted">
                          Try a different search term or browse our collections
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid gap-12 lg:grid-cols-2">
                      <div className="space-y-8">
                        <div>
                          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                            <Clock className="h-3.5 w-3.5 text-luxury-gold" />
                            Recent Searches
                          </h3>
                          <div className="space-y-1.5">
                            {recentSearches.map((term) => (
                              <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-luxury-text transition-colors hover:bg-luxury-muted-bg"
                              >
                                <Search className="h-3.5 w-3.5 text-luxury-muted" />
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                            <TrendingUp className="h-3.5 w-3.5 text-luxury-gold" />
                            Trending
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {trendingSearches.map((term) => (
                              <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="rounded-full border border-luxury-border px-4 py-1.5 text-xs font-medium text-luxury-text transition-all duration-200 hover:border-luxury-gold hover:text-luxury-gold"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                            Popular Collections
                          </h3>
                          <div className="space-y-1">
                            {popularCollections.map((col) => (
                              <Link
                                key={col.slug}
                                href={`/collections/${col.slug}`}
                                onClick={onClose}
                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-luxury-text transition-colors hover:bg-luxury-muted-bg hover:text-luxury-gold"
                              >
                                {col.name}
                                <ArrowRight className="h-3.5 w-3.5 text-luxury-muted" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                          Popular Products
                        </h3>
                        <div className="space-y-3">
                          {popularProducts.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              onClick={onClose}
                              className="group flex items-center gap-4 rounded-xl border border-luxury-border p-3 transition-all duration-300 hover:border-luxury-gold/30 hover:luxury-shadow"
                            >
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="64px" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-luxury-dark transition-colors group-hover:text-luxury-gold">{product.name}</p>
                                <p className="text-sm font-bold text-luxury-gold">${product.price.toLocaleString()}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-luxury-muted opacity-0 transition-all group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
