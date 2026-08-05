"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";

interface AdminTopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function AdminTopbar({ title, onMenuClick }: AdminTopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-luxury-border bg-white/95 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="flex h-9 w-9 items-center justify-center rounded-lg text-luxury-text hover:bg-luxury-muted-bg lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-luxury-dark">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-luxury-border bg-luxury-muted-bg/50 px-3 py-2 sm:flex">
          <Search className="h-4 w-4 text-luxury-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm text-luxury-dark outline-none placeholder:text-luxury-muted"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-luxury-text hover:bg-luxury-muted-bg">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-luxury-gold" />
        </button>

        <div ref={ref} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-luxury-muted-bg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-luxury-gold/10 text-xs font-bold text-luxury-gold">
              A
            </div>
            <span className="hidden text-sm font-medium text-luxury-dark sm:inline">Admin</span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-luxury-muted sm:block" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-44 overflow-hidden rounded-xl border border-luxury-border bg-white shadow-lg"
              >
                <Link href="/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-luxury-text transition-colors hover:bg-luxury-muted-bg">
                  <User className="h-3.5 w-3.5" /> Profile
                </Link>
                <Link href="/login" className="flex items-center gap-2 border-t border-luxury-border px-4 py-2.5 text-sm text-luxury-muted transition-colors hover:text-red-500">
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
