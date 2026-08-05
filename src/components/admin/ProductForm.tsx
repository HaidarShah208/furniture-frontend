"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import LuxuryInput from "@/components/common/Input";
import LuxuryTextarea from "@/components/common/Textarea";
import { cn } from "@/lib/utils";
import { useCreateProductMutation, useUpdateProductMutation } from "@/redux/dashboard/apis/products";
import { useGetCategoriesQuery } from "@/redux/dashboard/apis/categories";
import type { Product } from "@/types/admin/product";
import type { EntityStatus } from "@/types/admin/common";

const statusOptions: EntityStatus[] = ["active", "draft", "archived"];

interface ProductFormValues {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: EntityStatus;
  featured: boolean;
  categoryId: string;
}

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  salePrice: z.number().positive().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  status: z.enum(["active", "draft", "archived"]),
  featured: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
});

interface ProductFormProps {
  initialData?: Product;
  mode: "create" | "edit";
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const categories = categoriesData?.data || [];
  const isSubmitting = creating || updating;

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      salePrice: undefined,
      stock: 0,
      status: "draft",
      featured: false,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description || "",
        price: Number(initialData.price),
        salePrice: initialData.salePrice ? Number(initialData.salePrice) : undefined,
        stock: initialData.stock,
        status: initialData.status,
        featured: initialData.featured,
        categoryId: initialData.categoryId,
      });
    }
  }, [initialData, reset]);

  const currentStatus = watch("status");

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const payload = {
        ...data,
        salePrice: data.salePrice && !isNaN(data.salePrice) ? data.salePrice : undefined,
      };

      if (mode === "create") {
        await createProduct(payload).unwrap();
        toast.success("Product created");
      } else if (initialData) {
        await updateProduct({ id: initialData.id, data: payload }).unwrap();
        toast.success("Product updated");
      }
      router.push("/admin/products");
    } catch {
      toast.error(mode === "create" ? "Failed to create product" : "Failed to update product");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-luxury-muted hover:text-luxury-dark">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <LuxuryInput label="Product Name" {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <LuxuryInput label="Slug (auto-generated if empty)" {...register("slug")} />
            </div>
            <div>
              <LuxuryTextarea label="Description" {...register("description")} rows={4} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-luxury-dark">Pricing & Inventory</h3>
            <div className="space-y-4">
              <div>
                <LuxuryInput label="Price ($)" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
              </div>
              <LuxuryInput label="Sale Price ($)" type="number" step="0.01" {...register("salePrice", { valueAsNumber: true })} />
              <div>
                <LuxuryInput label="Stock Quantity" type="number" {...register("stock", { valueAsNumber: true })} />
                {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-luxury-border bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-luxury-dark">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">Category</label>
                <select
                  {...register("categoryId")}
                  className="w-full rounded-lg border border-luxury-border bg-white px-4 py-3 text-sm text-luxury-dark focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>}
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">Status</label>
                <div className="flex gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setValue("status", s)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-colors",
                        currentStatus === s ? "bg-luxury-dark text-white" : "border border-luxury-border text-luxury-text hover:border-luxury-dark"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" {...register("featured")} className="h-4 w-4 rounded border-luxury-border text-luxury-gold focus:ring-luxury-gold/30" />
                <label htmlFor="featured" className="text-xs font-semibold text-luxury-dark">Featured Product</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : mode === "create" ? "Create Product" : "Update Product"}
          </motion.button>
          <Link href="/admin/products" className="rounded-lg border border-luxury-border px-6 py-3 text-sm font-semibold text-luxury-text hover:border-luxury-dark">
            Cancel
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
