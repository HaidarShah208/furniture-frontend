"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { removeAuthCookie } from "@/redux/middleware/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarNav({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-luxury-border px-6">
        <Link href="/admin/dashboard" className="text-lg font-bold tracking-tight text-luxury-dark">
          LUXE <span className="text-luxury-gold">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-luxury-gold/10 text-luxury-gold"
                      : "text-luxury-text hover:bg-luxury-muted-bg hover:text-luxury-dark"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="adminSidebarActive"
                      className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-luxury-border px-3 py-4">
        <button
          onClick={() => {
            removeAuthCookie();
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-luxury-muted transition-colors hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 border-r border-luxury-border bg-white lg:block">
        <SidebarNav />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-screen w-60 border-r border-luxury-border bg-white"
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-luxury-muted hover:text-luxury-dark"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarNav onItemClick={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
