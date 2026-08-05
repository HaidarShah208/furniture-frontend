"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { accordionAnimation } from "@/lib/animations";
import type { AccordionItemData } from "@/types/common";

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-luxury-border rounded-2xl border border-luxury-border bg-white",
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300 hover:bg-luxury-muted-bg/50"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-luxury-dark">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-4 w-4 text-luxury-muted" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div {...accordionAnimation} className="overflow-hidden">
                  <div className="px-6 pb-5">
                    {typeof item.content === "string" ? (
                      <p className="text-sm leading-relaxed text-luxury-secondary">
                        {item.content}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {item.content.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm leading-relaxed text-luxury-secondary"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-gold" />
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
