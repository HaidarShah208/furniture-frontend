"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/types/common";
import { cn } from "@/lib/utils";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ur", label: "اردو", flag: "UR" },
];

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300",
          light
            ? "text-white/80 hover:text-white"
            : "text-luxury-text hover:text-luxury-dark"
        )}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{language}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl bg-white luxury-shadow-lg"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-200",
                  language === lang.code
                    ? "bg-luxury-bg text-luxury-gold font-medium"
                    : "text-luxury-text hover:bg-luxury-bg"
                )}
              >
                <span className="text-xs font-bold uppercase text-luxury-muted">
                  {lang.flag}
                </span>
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
