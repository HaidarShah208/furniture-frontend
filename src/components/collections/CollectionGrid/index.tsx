"use client";

import CollectionCard from "@/components/collections/CollectionCard";
import type { LuxeCollection } from "@/types/collection";

interface CollectionGridProps {
  collections: LuxeCollection[];
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}
