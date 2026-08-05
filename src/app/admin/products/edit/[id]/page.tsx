"use client";

import { use } from "react";
import ProductForm from "@/components/admin/ProductForm";
import AdminFormSkeleton from "@/components/admin/AdminFormSkeleton";
import AdminErrorState from "@/components/admin/AdminErrorState";
import { useGetProductByIdQuery } from "@/redux/dashboard/apis/products";

function EditProductContent({ id }: { id: string }) {
  const { data, isLoading, error, refetch } = useGetProductByIdQuery(id);

  if (isLoading) return <AdminFormSkeleton />;
  if (error || !data?.data) return <AdminErrorState message="Product not found" onRetry={refetch} />;

  return <ProductForm mode="edit" initialData={data.data} />;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <EditProductContent id={id} />;
}
