"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Edit3, Trash2, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LuxuryInput from "@/components/common/Input";
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/redux/dashboard/apis/categories";
import AdminTableSkeleton from "@/components/admin/AdminTableSkeleton";
import AdminErrorState from "@/components/admin/AdminErrorState";
import AdminDeleteDialog from "@/components/admin/AdminDeleteDialog";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  image: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoriesPage() {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "", image: "" },
  });

  const categories = data?.data || [];
  const isSaving = creating || updating;

  const resetForm = () => {
    reset({ name: "", slug: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (cat: typeof categories[0]) => {
    reset({ name: cat.name, slug: cat.slug, image: cat.image || "" });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const onSubmit = async (formData: CategoryFormValues) => {
    try {
      if (editingId) {
        await updateCategory({ id: editingId, data: formData }).unwrap();
        toast.success("Category updated");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created");
      }
      resetForm();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCategory(deleteId).unwrap();
      toast.success("Category deleted");
      setDeleteId(null);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  if (error) return <AdminErrorState message="Failed to load categories" onRetry={refetch} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex justify-end">
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold"
          >
            <Plus className="h-3.5 w-3.5" /> Add Category
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-luxury-border bg-white p-5"
          >
            <h3 className="mb-4 text-sm font-bold text-luxury-dark">{editingId ? "Edit Category" : "New Category"}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <LuxuryInput label="Name" {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <LuxuryInput label="Slug" {...register("slug")} />
                <LuxuryInput label="Image URL" {...register("image")} />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2 text-xs font-semibold text-white hover:bg-luxury-gold disabled:opacity-60"
                >
                  <Check className="h-3.5 w-3.5" /> {isSaving ? "Saving..." : editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-luxury-border px-4 py-2 text-xs font-semibold text-luxury-text hover:border-luxury-dark"
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <AdminTableSkeleton rows={5} columns={4} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-luxury-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-luxury-border bg-luxury-muted-bg/30">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Category</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Slug</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted">Products</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-luxury-muted" />
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border">
                {categories.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-luxury-muted">No categories yet.</td></tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {cat.image ? (
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                              <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-luxury-muted-bg text-xs font-bold text-luxury-muted">
                              {cat.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-luxury-dark">{cat.name}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-muted">{cat.slug}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{cat.productCount ?? 0}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(cat)} className="text-luxury-muted hover:text-luxury-gold">
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setDeleteId(cat.id)} className="text-luxury-muted hover:text-red-500">
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

      <AdminDeleteDialog
        open={!!deleteId}
        title="Delete Category"
        description="This will permanently remove this category. Categories with products cannot be deleted."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </motion.div>
  );
}
