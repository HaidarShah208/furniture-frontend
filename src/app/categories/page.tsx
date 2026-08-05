"use client";

import { useState, useMemo } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import CategoriesHero from "@/components/categories/Hero";
import Breadcrumb from "@/components/product/Breadcrumb";
import Filters from "@/components/categories/Filters";
import CategoryGrid from "@/components/categories/CategoryGrid";
import Container from "@/components/common/Container";
import type { CategoryFilters } from "@/types/category";
import { categories } from "@/data/categories";

const defaultFilters: CategoryFilters = {
  category: "",
  priceRange: [0, 10000],
  materials: [],
  colors: [],
  availability: "",
  collection: "",
  sortBy: "featured",
};

function CategoriesContent() {
  const [filters, setFilters] = useState<CategoryFilters>(defaultFilters);

  const filteredCategories = useMemo(() => {
    let result = [...categories];

    if (filters.category) {
      result = result.filter((c) => c.slug === filters.category);
    }

    if (filters.collection) {
      const collectionMap: Record<string, string> = {
        "modern-minimalist": "Modern Minimalist",
        "classic-heritage": "Classic Heritage",
        "urban-luxe": "Urban Luxe",
      };
      result = result.filter(
        (c) => c.collection === collectionMap[filters.collection]
      );
    }

    if (filters.priceRange[1] < 10000) {
      result = result.filter(
        (c) =>
          c.startingPrice >= filters.priceRange[0] &&
          c.startingPrice <= filters.priceRange[1]
      );
    }

    if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (filters.sortBy === "popular") {
      result.sort((a, b) => b.itemCount - a.itemCount);
    }

    return result;
  }, [filters]);

  return (
    <main>
      <Navbar />
      <CategoriesHero />
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: "Categories" }]}
        />
        <div className="mt-6 flex gap-8 lg:gap-10">
          <div className="hidden w-72 shrink-0 lg:block">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filteredCategories.length}
            />
          </div>
          <div className="min-w-0 flex-1">
            <CategoryGrid
              categories={filteredCategories}
              onReset={() => setFilters(defaultFilters)}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={filteredCategories.length}
          />
        </div>
      </Container>
      <Newsletter />
      <Footer />
    </main>
  );
}

export default function CategoriesPage() {
  return (
    <LanguageProvider>
      <CategoriesContent />
    </LanguageProvider>
  );
}
