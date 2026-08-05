"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccordionItemData } from "@/types/common";

interface ProductAccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
}

export default function ProductAccordion({
  items,
  defaultOpenId,
}: ProductAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="divide-y divide-luxury-border rounded-2xl border border-luxury-border bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300 hover:bg-luxury-muted-bg/50"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-luxury-dark">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isOpen ? "text-luxury-gold" : "text-luxury-muted"
                  )}
                />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    {typeof item.content === "string" ? (
                      <p className="text-sm leading-relaxed text-luxury-secondary">
                        {item.content}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {item.content.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-luxury-secondary"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-gold" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
