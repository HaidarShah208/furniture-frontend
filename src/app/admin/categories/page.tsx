"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Edit3, Trash2, Check, X } from "lucide-react";
import LuxuryInput from "@/components/common/Input";
import { adminCategories, type AdminCategory } from "@/data/admin";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(adminCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", image: "" });

  const resetForm = () => {
    setForm({ name: "", slug: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (cat: AdminCategory) => {
    setForm({ name: cat.name, slug: cat.slug, image: cat.image });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      setCategories((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    } else {
      setCategories((prev) => [
        ...prev,
        { id: `cat-${Date.now()}`, name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"), image: form.image, productCount: 0 },
      ]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

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
            <div className="grid gap-4 sm:grid-cols-3">
              <LuxuryInput label="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              <LuxuryInput label="Slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
              <LuxuryInput label="Image URL" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-lg bg-luxury-dark px-4 py-2 text-xs font-semibold text-white hover:bg-luxury-gold">
                <Check className="h-3.5 w-3.5" /> {editingId ? "Update" : "Save"}
              </button>
              <button onClick={resetForm} className="inline-flex items-center gap-1.5 rounded-lg border border-luxury-border px-4 py-2 text-xs font-semibold text-luxury-text hover:border-luxury-dark">
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {categories.map((cat) => (
                <tr key={cat.id} className="transition-colors hover:bg-luxury-muted-bg/20">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-luxury-muted-bg">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <span className="text-xs font-semibold text-luxury-dark">{cat.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-luxury-muted">{cat.slug}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs font-medium text-luxury-dark">{cat.productCount}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(cat)} className="text-luxury-muted hover:text-luxury-gold">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-luxury-muted hover:text-red-500">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
