"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LuxuryInput from "@/components/common/Input";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/dashboard/apis/settings";
import AdminFormSkeleton from "@/components/admin/AdminFormSkeleton";
import AdminErrorState from "@/components/admin/AdminErrorState";
import type { UpdateSettingsRequest } from "@/types/admin/settings";

const settingsSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  logo: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { data, isLoading, error, refetch } = useGetSettingsQuery();
  const [updateSettings, { isLoading: saving }] = useUpdateSettingsMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      storeName: "",
      logo: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      const s = data.data;
      reset({
        storeName: s.storeName || "",
        logo: s.logo || "",
        phone: s.phone || "",
        whatsapp: s.whatsapp || "",
        email: s.email || "",
        address: s.address || "",
        facebook: s.facebook || "",
        instagram: s.instagram || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: SettingsFormValues) => {
    try {
      const payload: UpdateSettingsRequest = {
        storeName: formData.storeName,
        logo: formData.logo || null,
        phone: formData.phone || null,
        whatsapp: formData.whatsapp || null,
        email: formData.email || null,
        address: formData.address || null,
        facebook: formData.facebook || null,
        instagram: formData.instagram || null,
      };
      await updateSettings(payload).unwrap();
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  if (isLoading) return <AdminFormSkeleton />;
  if (error) return <AdminErrorState message="Failed to load settings" onRetry={refetch} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Store Information</h3>
          <div className="space-y-4">
            <div>
              <LuxuryInput label="Store Name" {...register("storeName")} />
              {errors.storeName && <p className="mt-1 text-xs text-red-500">{errors.storeName.message}</p>}
            </div>
            <LuxuryInput label="Logo URL" {...register("logo")} placeholder="https://..." />
            <LuxuryInput label="Address" {...register("address")} />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Contact</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LuxuryInput label="Phone" {...register("phone")} />
              <LuxuryInput label="WhatsApp" {...register("whatsapp")} />
            </div>
            <div>
              <LuxuryInput label="Email" type="email" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-luxury-dark">Social Media</h3>
          <div className="space-y-4">
            <LuxuryInput label="Facebook" {...register("facebook")} />
            <LuxuryInput label="Instagram" {...register("instagram")} />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </motion.button>
      </form>
    </motion.div>
  );
}
