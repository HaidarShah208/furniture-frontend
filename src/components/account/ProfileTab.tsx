"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Check } from "lucide-react";
import LuxuryInput from "@/components/common/Input";
import type { UserProfile } from "@/data/account";

interface ProfileTabProps {
  profile: UserProfile;
}

export default function ProfileTab({ profile }: ProfileTabProps) {
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">My Profile</h2>

      <div className="mb-8 flex items-center gap-5">
        <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-luxury-border">
          <Image src={profile.avatar} alt={profile.firstName} fill className="object-cover" sizes="80px" />
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-5 w-5 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-luxury-dark">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-xs text-luxury-muted">{profile.joinDate}</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <LuxuryInput
            label="First Name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <LuxuryInput
            label="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
        <LuxuryInput
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <LuxuryInput
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-luxury-dark px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
          >
            {saved ? <><Check className="h-4 w-4" /> Saved</> : "Save Changes"}
          </motion.button>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-emerald-600"
            >
              Profile updated successfully
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
