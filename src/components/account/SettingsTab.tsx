"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Eye, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}

function Toggle({ enabled, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-luxury-dark">{label}</p>
        <p className="text-xs text-luxury-muted">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300",
          enabled ? "bg-luxury-gold" : "bg-luxury-border"
        )}
        role="switch"
        aria-checked={enabled}
      >
        <motion.span
          layout
          className="inline-block h-5 w-5 rounded-full bg-white shadow-sm"
          style={{ marginTop: 2, marginLeft: enabled ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    twoFactor: false,
    loginAlerts: true,
    showProfile: true,
    showOrders: false,
  });
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof settings, val: boolean) => {
    setSettings((p) => ({ ...p, [key]: val }));
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
      <h2 className="mb-6 text-xl font-bold text-luxury-dark">Settings</h2>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-luxury-gold" />
            <h3 className="text-sm font-bold text-luxury-dark">Notifications</h3>
          </div>
          <div className="divide-y divide-luxury-border">
            <Toggle enabled={settings.orderUpdates} onChange={(v) => update("orderUpdates", v)} label="Order Updates" description="Get notified about shipping and delivery status" />
            <Toggle enabled={settings.promotions} onChange={(v) => update("promotions", v)} label="Promotions" description="Receive exclusive offers and sale alerts" />
            <Toggle enabled={settings.newsletter} onChange={(v) => update("newsletter", v)} label="Newsletter" description="Weekly design inspiration and new arrivals" />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-luxury-gold" />
            <h3 className="text-sm font-bold text-luxury-dark">Security</h3>
          </div>
          <div className="divide-y divide-luxury-border">
            <Toggle enabled={settings.twoFactor} onChange={(v) => update("twoFactor", v)} label="Two-Factor Authentication" description="Add an extra layer of security to your account" />
            <Toggle enabled={settings.loginAlerts} onChange={(v) => update("loginAlerts", v)} label="Login Alerts" description="Get notified of new sign-ins to your account" />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4 text-luxury-gold" />
            <h3 className="text-sm font-bold text-luxury-dark">Privacy</h3>
          </div>
          <div className="divide-y divide-luxury-border">
            <Toggle enabled={settings.showProfile} onChange={(v) => update("showProfile", v)} label="Public Profile" description="Allow others to see your profile information" />
            <Toggle enabled={settings.showOrders} onChange={(v) => update("showOrders", v)} label="Order History Visibility" description="Show recently purchased items on your profile" />
          </div>
        </div>

        <div className="rounded-xl border border-luxury-border bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-luxury-gold" />
            <h3 className="text-sm font-bold text-luxury-dark">Preferences</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-luxury-secondary">Currency</span>
              <span className="font-medium text-luxury-dark">USD ($)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-luxury-secondary">Language</span>
              <span className="font-medium text-luxury-dark">English</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-luxury-secondary">Measurement</span>
              <span className="font-medium text-luxury-dark">Metric (cm)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-luxury-dark px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
          >
            {saved ? <><Check className="h-4 w-4" /> Saved</> : "Save Settings"}
          </motion.button>
          {saved && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-emerald-600">
              Settings updated
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
