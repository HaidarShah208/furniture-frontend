"use client";

import { use } from "react";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminProductById } from "@/data/admin";
import Link from "next/link";

function EditContent({ id }: { id: string }) {
  const product = getAdminProductById(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <h2 className="mb-2 text-lg font-bold text-luxury-dark">Product not found</h2>
        <Link href="/admin/products" className="mt-4 text-sm font-semibold text-luxury-gold hover:text-luxury-gold-hover">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  return <ProductForm mode="edit" initialData={product} />;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <EditContent id={id} />;
}
