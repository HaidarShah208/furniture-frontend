"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit3, Trash2, Check, Star } from "lucide-react";
import LuxuryInput from "@/components/common/Input";
import { cn } from "@/lib/utils";
import type { Address } from "@/data/account";

interface AddressesTabProps {
  initialAddresses: Address[];
}

export default function AddressesTab({ initialAddresses }: AddressesTabProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const resetForm = () => {
    setForm({ label: "", firstName: "", lastName: "", address: "", apartment: "", city: "", state: "", zip: "", country: "", phone: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (addr: Address) => {
    setForm({
      label: addr.label,
      firstName: addr.firstName,
      lastName: addr.lastName,
      address: addr.address,
      apartment: addr.apartment,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: addr.phone,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        ...form,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddr]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-luxury-dark">Addresses</h2>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-1.5 rounded-lg bg-luxury-dark px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Address
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 max-w-2xl rounded-xl border border-luxury-border bg-white p-6"
          >
            <h3 className="mb-5 text-sm font-bold text-luxury-dark">
              {editingId ? "Edit Address" : "New Address"}
            </h3>
            <div className="space-y-4">
              <LuxuryInput label="Label" placeholder="e.g. Home, Office" value={form.label} onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))} />
              <div className="grid gap-4 sm:grid-cols-2">
                <LuxuryInput label="First Name" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
                <LuxuryInput label="Last Name" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
              </div>
              <LuxuryInput label="Street Address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
              <LuxuryInput label="Apartment / Suite" value={form.apartment} onChange={(e) => setForm((p) => ({ ...p, apartment: e.target.value }))} />
              <div className="grid gap-4 sm:grid-cols-3">
                <LuxuryInput label="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
                <LuxuryInput label="State" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
                <LuxuryInput label="ZIP" value={form.zip} onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <LuxuryInput label="Country" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} />
                <LuxuryInput label="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-1.5 rounded-lg bg-luxury-dark px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-luxury-gold">
                <Check className="h-3.5 w-3.5" />
                {editingId ? "Update" : "Save"} Address
              </motion.button>
              <button onClick={resetForm} className="rounded-lg border border-luxury-border px-6 py-2.5 text-xs font-semibold text-luxury-text transition-colors hover:border-luxury-dark">
                Cancel
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-muted-bg">
            <MapPin className="h-7 w-7 text-luxury-muted" />
          </div>
          <h3 className="mb-1 text-base font-bold text-luxury-dark">No saved addresses</h3>
          <p className="text-sm text-luxury-muted">Add an address for faster checkout</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr, index) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "relative rounded-xl border bg-white p-5 transition-all duration-300",
                addr.isDefault ? "border-luxury-gold" : "border-luxury-border hover:border-luxury-gold/30"
              )}
            >
              {addr.isDefault && (
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-luxury-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-luxury-gold">
                  <Star className="h-3 w-3 fill-luxury-gold" />
                  Default
                </span>
              )}
              <h4 className="mb-1 text-sm font-bold text-luxury-dark">{addr.label}</h4>
              <div className="mb-3 space-y-0.5 text-xs text-luxury-secondary">
                <p>{addr.firstName} {addr.lastName}</p>
                <p>{addr.address}{addr.apartment ? `, ${addr.apartment}` : ""}</p>
                <p>{addr.city}, {addr.state} {addr.zip}</p>
                <p>{addr.country}</p>
                <p>{addr.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(addr)} className="flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-1.5 text-[10px] font-semibold text-luxury-text transition-colors hover:border-luxury-gold hover:text-luxury-gold">
                  <Edit3 className="h-3 w-3" /> Edit
                </button>
                {!addr.isDefault && (
                  <>
                    <button onClick={() => handleSetDefault(addr.id)} className="flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-1.5 text-[10px] font-semibold text-luxury-text transition-colors hover:border-luxury-gold hover:text-luxury-gold">
                      Set Default
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-1.5 text-[10px] font-semibold text-luxury-muted transition-colors hover:border-red-300 hover:text-red-500">
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
