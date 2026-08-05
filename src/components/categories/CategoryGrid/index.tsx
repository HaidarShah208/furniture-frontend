"use client";

import CategoryCard from "@/components/categories/CategoryCard";
import EmptyState from "@/components/categories/EmptyState";
import type { Category } from "@/types/category";

interface CategoryGridProps {
  categories: Category[];
  onReset: () => void;
}

export default function CategoryGrid({ categories, onReset }: CategoryGridProps) {
  if (categories.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
