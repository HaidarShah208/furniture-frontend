"use client";

import { useState, useMemo, use } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductToolbar from "@/components/collection-details/ProductToolbar";
import FilterSidebar from "@/components/collection-details/FilterSidebar";
import ProductListing from "@/components/collection-details/ProductListing";
import Pagination from "@/components/collection-details/Pagination";
import QuickViewModal from "@/components/collection-details/QuickViewModal";
import RecentlyViewed from "@/components/collection-details/RecentlyViewed";
import Container from "@/components/common/Container";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { PLPFilters } from "@/types/filter";
import { defaultPLPFilters } from "@/types/filter";
import type { SortOption } from "@/types/sort";
import type { Product } from "@/types/product";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ITEMS_PER_PAGE = 12;

function CategoryHeroBanner({ name, description, image }: { name: string; description: string; image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative flex h-[50vh] min-h-95 items-end overflow-hidden lg:h-[55vh]">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

      <Container className="relative z-10 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
            Category
          </span>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function CategoryDetailContent({ slug }: { slug: string }) {
  const category = categories.find((c) => c.slug === slug) || categories[0];
  const [filters, setFilters] = useState<PLPFilters>(defaultPLPFilters);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryProducts = useMemo(() => {
    const matched = products.filter(
      (p) => p.categorySlug === slug || p.category.toLowerCase().replace(/\s+/g, "-").includes(slug.split("-")[0])
    );
    let result = matched.length > 0 ? matched : [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        filters.materials.some((m) =>
          p.material.toLowerCase().includes(m.replace(/-/g, " "))
        )
      );
    }

    if (filters.availability) {
      result = result.filter((p) => p.availability === filters.availability);
    }

    if (filters.priceRange[1] < 15000) {
      result = result.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "popularity":
      case "best-selling":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [slug, filters, sortBy, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(categoryProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const recentlyViewedProducts = useMemo(() => {
    return products.filter((p) => p.id !== quickViewProduct?.id).slice(0, 8);
  }, [quickViewProduct]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setFilters(defaultPLPFilters);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <CategoryHeroBanner
        name={category.name}
        description={category.description}
        image={category.image}
      />

      <section className="py-10 lg:py-14">
        <Container>
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.name },
            ]}
          />

          <div className="mt-6">
            <ProductToolbar
              totalProducts={categoryProducts.length}
              sortBy={sortBy}
              onSortChange={(v) => { setSortBy(v); setCurrentPage(1); }}
              gridCols={gridCols}
              onGridChange={setGridCols}
              onToggleFilters={() => setFiltersVisible(!filtersVisible)}
              filtersVisible={filtersVisible}
              searchQuery={searchQuery}
              onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
            />

            <div className="flex gap-8 lg:gap-10">
              <div className="hidden w-64 shrink-0 lg:block">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={(f) => { setFilters(f); setCurrentPage(1); }}
                  visible={filtersVisible}
                  onClose={() => setFiltersVisible(false)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <ProductListing
                  products={paginatedProducts}
                  gridCols={gridCols}
                  onQuickView={setQuickViewProduct}
                  onReset={handleResetFilters}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onFiltersChange={(f) => { setFilters(f); setCurrentPage(1); }}
              visible={filtersVisible}
              onClose={() => setFiltersVisible(false)}
            />
          </div>
        </Container>
      </section>

      <RecentlyViewed products={recentlyViewedProducts} />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <LanguageProvider>
      <CategoryDetailContent slug={slug} />
    </LanguageProvider>
  );
}
