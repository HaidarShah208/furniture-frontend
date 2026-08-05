"use client";

import PLPProductCard from "@/components/collection-details/ProductCard";
import PLPEmptyState from "@/components/collection-details/EmptyState";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductListingProps {
  products: Product[];
  gridCols: 3 | 4;
  onQuickView: (product: Product) => void;
  onReset: () => void;
}

export default function ProductListing({
  products,
  gridCols,
  onQuickView,
  onReset,
}: ProductListingProps) {
  if (products.length === 0) {
    return <PLPEmptyState onReset={onReset} />;
  }

  return (
    <div
      className={cn(
        "grid gap-5",
        "grid-cols-1 sm:grid-cols-2",
        gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
      )}
    >
      {products.map((product, index) => (
        <PLPProductCard
          key={product.id}
          product={product}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
