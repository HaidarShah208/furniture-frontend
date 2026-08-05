"use client";

import { useState, useMemo, use } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import CollectionHeader from "@/components/collection-details/CollectionHeader";
import CollectionStory from "@/components/collection-details/CollectionStory";
import ProductToolbar from "@/components/collection-details/ProductToolbar";
import FilterSidebar from "@/components/collection-details/FilterSidebar";
import ProductListing from "@/components/collection-details/ProductListing";
import Pagination from "@/components/collection-details/Pagination";
import QuickViewModal from "@/components/collection-details/QuickViewModal";
import Container from "@/components/common/Container";
import { getCollectionBySlug, collections as allCollections } from "@/data/collections";
import { products } from "@/data/products";
import type { PLPFilters } from "@/types/filter";
import { defaultPLPFilters } from "@/types/filter";
import type { SortOption } from "@/types/sort";
import type { Product } from "@/types/product";

const ITEMS_PER_PAGE = 12;

function CollectionDetailContent({ slug }: { slug: string }) {
  const collection = getCollectionBySlug(slug) || allCollections[0];
  const [filters, setFilters] = useState<PLPFilters>(defaultPLPFilters);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const collectionProducts = useMemo(() => {
    const matched = products.filter(
      (p) => p.collection.toLowerCase().replace(/\s+/g, "-") === slug
    );
    let result = matched.length > 0 ? matched : [...products];

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
  }, [slug, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(collectionProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = collectionProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setFilters(defaultPLPFilters);
    setCurrentPage(1);
  };

  return (
    <main>
      <Navbar />
      <CollectionHeader collection={collection} />

      <CollectionStory
        story={collection.story}
        designer={collection.designer}
      />

      <section className="py-10 lg:py-14">
        <Container>
          <Breadcrumb
            items={[
              { label: "Collections", href: "/collections" },
              { label: collection.name },
            ]}
          />

          <div className="mt-6">
            <ProductToolbar
              totalProducts={collectionProducts.length}
              sortBy={sortBy}
              onSortChange={(v) => { setSortBy(v); setCurrentPage(1); }}
              gridCols={gridCols}
              onGridChange={setGridCols}
              onToggleFilters={() => setFiltersVisible(!filtersVisible)}
              filtersVisible={filtersVisible}
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

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <Newsletter />
      <Footer />
    </main>
  );
}

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = use(params);
  return (
    <LanguageProvider>
      <CollectionDetailContent slug={collection} />
    </LanguageProvider>
  );
}
