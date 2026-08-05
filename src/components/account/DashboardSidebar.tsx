"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Package, Heart, MapPin, Settings, LogOut, Menu } from "lucide-react";
import Drawer from "@/components/common/Drawer";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/data/account";

export type DashboardTab = "profile" | "orders" | "wishlist" | "addresses" | "settings";

const navItems: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "My Profile", icon: <User className="h-4 w-4" /> },
  { id: "orders", label: "My Orders", icon: <Package className="h-4 w-4" /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
  { id: "addresses", label: "Addresses", icon: <MapPin className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  profile: UserProfile;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SidebarContent({ activeTab, onTabChange, profile, onItemClick }: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  profile: UserProfile;
  onItemClick?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center border-b border-luxury-border p-6">
        <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-luxury-gold">
          <Image src={profile.avatar} alt={profile.firstName} fill className="object-cover" sizes="80px" />
        </div>
        <h3 className="text-sm font-bold text-luxury-dark">
          {profile.firstName} {profile.lastName}
        </h3>
        <p className="text-[11px] text-luxury-muted">{profile.joinDate}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id);
                    onItemClick?.();
                  }}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-luxury-gold/5 text-luxury-gold"
                      : "text-luxury-text hover:bg-luxury-muted-bg hover:text-luxury-dark"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActive"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {item.icon}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-luxury-border p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-luxury-muted transition-colors hover:text-red-500">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function MobileTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-luxury-border px-4 py-2.5 text-sm font-medium text-luxury-dark transition-colors hover:border-luxury-gold lg:hidden"
    >
      <Menu className="h-4 w-4" />
      Dashboard Menu
    </button>
  );
}

export default function DashboardSidebar({
  activeTab,
  onTabChange,
  profile,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 overflow-hidden rounded-2xl border border-luxury-border bg-white luxury-shadow">
          <SidebarContent
            activeTab={activeTab}
            onTabChange={onTabChange}
            profile={profile}
          />
        </div>
      </aside>

      {/* Mobile drawer */}
      <Drawer open={mobileOpen} onClose={onMobileClose} side="left" title="Dashboard">
        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          profile={profile}
          onItemClick={onMobileClose}
        />
      </Drawer>
    </>
  );
}
