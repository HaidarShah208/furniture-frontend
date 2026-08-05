"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import LuxuryInput from "@/components/common/Input";
import { storeSettings } from "@/data/admin";

export default function SettingsPage() {
  const [form, setForm] = useState({ ...storeSettings });
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleSave} className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Store Information</h3>
          <div className="space-y-4">
            <LuxuryInput label="Store Name" value={form.storeName} onChange={(e) => update("storeName", e.target.value)} />
            <LuxuryInput label="Logo URL" value={form.logo} onChange={(e) => update("logo", e.target.value)} placeholder="https://..." />
            <LuxuryInput label="Address" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Contact</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LuxuryInput label="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <LuxuryInput label="WhatsApp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
            </div>
            <LuxuryInput label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Social Media</h3>
          <div className="space-y-4">
            <LuxuryInput label="Facebook" value={form.facebook} onChange={(e) => update("facebook", e.target.value)} />
            <LuxuryInput label="Instagram" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} />
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
            {saved ? <><Check className="h-4 w-4" /> Saved!</> : "Save Settings"}
          </motion.button>
          {saved && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-emerald-600">
              Settings updated successfully
            </motion.span>
          )}
        </div>
      </form>
    </motion.div>
  );
}
