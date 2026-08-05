"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useGetProductsQuery, useDeleteProductMutation } from "@/redux/dashboard/apis/products";
import { productStatusStyles } from "@/types/admin/common";
import AdminTableSkeleton from "@/components/admin/AdminTableSkeleton";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminErrorState from "@/components/admin/AdminErrorState";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import AdminDeleteDialog from "@/components/admin/AdminDeleteDialog";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery({
    page,
    limit: 20,
    search: search.trim() || undefined,
  });
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const products = data?.data || [];
  const pagination = data?.pagination;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId).unwrap();
      toast.success("Product deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (error) return <AdminErrorState message="Failed to load products" onRetry={refetch} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-luxury-border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-luxury-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="w-40 bg-transparent text-sm text-luxury-dark outline-none placeholder:text-luxury-muted sm:w-56"
          />
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold"
        >
          <Plus className="h-3.5 w-3.5" /> Add Product
        </Link>
      </div>

      {isLoading ? (
        <AdminTableSkeleton rows={6} columns={6} />
      ) : (
        <div className={cn("overflow-hidden rounded-xl border border-luxury-border bg-white", isFetching && "opacity-60")}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-luxury-border bg-luxury-muted-bg/30">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Product</th>
                  <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted sm:table-cell">Category</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Price</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Stock</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted" />
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border">
                {products.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-luxury-muted">No products found.</td></tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-luxury-muted-bg text-xs font-bold text-luxury-muted">
                            {product.name.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-luxury-dark">{product.name}</span>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted sm:table-cell">{product.category?.name || "—"}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${Number(product.price).toLocaleString()}</td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className={cn("text-xs font-semibold", product.stock === 0 ? "text-red-500" : product.stock <= 5 ? "text-amber-600" : "text-luxury-dark")}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3"><AdminStatusBadge status={product.status} styles={productStatusStyles} /></td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/products/edit/${product.id}`} className="text-luxury-muted hover:text-luxury-gold">
                            <Edit3 className="h-3.5 w-3.5" />
                          </Link>
                          <button onClick={() => setDeleteId(product.id)} className="text-luxury-muted hover:text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pagination && <AdminPagination pagination={pagination} onPageChange={setPage} loading={isFetching} />}

      <AdminDeleteDialog
        open={!!deleteId}
        title="Delete Product"
        description="This will permanently remove this product. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </motion.div>
  );
}
