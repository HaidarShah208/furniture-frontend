"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit3, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminProducts } from "@/data/admin";

const statusStyles: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700" },
  draft: { bg: "bg-amber-50", text: "text-amber-700" },
  archived: { bg: "bg-gray-100", text: "text-gray-600" },
};

export default function ProductsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold"
        >
          <Plus className="h-3.5 w-3.5" /> Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-luxury-border bg-white">
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
              {adminProducts.map((product) => {
                const s = statusStyles[product.status];
                return (
                  <tr key={product.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <span className="text-xs font-semibold text-luxury-dark">{product.name}</span>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3 text-xs text-luxury-muted sm:table-cell">{product.category}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-xs font-semibold text-luxury-dark">${product.price.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <span className={cn("text-xs font-semibold", product.stock === 0 ? "text-red-500" : product.stock <= 5 ? "text-amber-600" : "text-luxury-dark")}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${product.slug}`} className="text-luxury-muted hover:text-luxury-gold">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link href={`/admin/products/edit/${product.id}`} className="text-luxury-muted hover:text-luxury-gold">
                          <Edit3 className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
