"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LuxuryInput from "@/components/common/Input";
import LuxuryTextarea from "@/components/common/Textarea";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/data/admin";

interface ProductFormProps {
  initialData?: AdminProduct;
  mode: "create" | "edit";
}

const categoryOptions = ["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor"];
const statusOptions = ["active", "draft", "archived"] as const;

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    category: initialData?.category || categoryOptions[0],
    price: initialData?.price?.toString() || "",
    originalPrice: initialData?.originalPrice?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    status: initialData?.status || "draft",
    image: initialData?.image || "",
    description: initialData?.description || "",
    material: initialData?.material || "",
    dimensions: initialData?.dimensions || "",
    variants: initialData?.variants?.join(", ") || "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-luxury-muted hover:text-luxury-dark">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LuxuryInput label="Product Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <LuxuryInput label="Slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
            </div>
            <LuxuryTextarea label="Description" value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} />
            <div className="grid gap-4 sm:grid-cols-2">
              <LuxuryInput label="Material" value={form.material} onChange={(e) => update("material", e.target.value)} />
              <LuxuryInput label="Dimensions" value={form.dimensions} onChange={(e) => update("dimensions", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-luxury-dark">Pricing & Inventory</h3>
            <div className="space-y-4">
              <LuxuryInput label="Price ($)" type="number" value={form.price} onChange={(e) => update("price", e.target.value)} />
              <LuxuryInput label="Compare at Price ($)" type="number" value={form.originalPrice} onChange={(e) => update("originalPrice", e.target.value)} />
              <LuxuryInput label="Stock Quantity" type="number" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
            </div>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-luxury-dark">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full rounded-lg border border-luxury-border bg-white px-4 py-3 text-sm text-luxury-dark focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
                >
                  {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">Status</label>
                <div className="flex gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update("status", s)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-colors",
                        form.status === s ? "bg-luxury-dark text-white" : "border border-luxury-border text-luxury-text hover:border-luxury-dark"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <LuxuryInput label="Variants (comma separated)" value={form.variants} onChange={(e) => update("variants", e.target.value)} placeholder="e.g. Cognac, Black, Tan" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Images</h3>
          <div className="space-y-4">
            <LuxuryInput label="Main Image URL" value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
            <p className="text-xs text-luxury-muted">Gallery image upload will be available in V2.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={saved}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
          >
            {saved ? <><Check className="h-4 w-4" /> Saved!</> : mode === "create" ? "Create Product" : "Update Product"}
          </motion.button>
          <Link href="/admin/products" className="rounded-lg border border-luxury-border px-6 py-3 text-sm font-semibold text-luxury-text hover:border-luxury-dark">
            Cancel
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
