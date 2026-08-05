"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import type { AccordionItemData } from "@/types/common";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductAccordion from "@/components/product/ProductAccordion";

interface ProductTabsProps {
  product: Product;
}

const tabKeys = ["description", "specifications", "details"] as const;
type TabKey = (typeof tabKeys)[number];

const tabLabels: Record<TabKey, string> = {
  description: "Description",
  specifications: "Specifications",
  details: "Details",
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const accordionItems: AccordionItemData[] = [
    { id: "care", title: "Care Instructions", content: product.careInstructions },
    { id: "shipping", title: "Shipping & Delivery", content: product.shippingInfo },
    { id: "warranty", title: "Warranty Information", content: product.warrantyInfo },
  ];

  return (
    <div>
      <div className="mb-8 flex gap-1 border-b border-luxury-border">
        {tabKeys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-300",
              activeTab === tab
                ? "text-luxury-dark"
                : "text-luxury-muted hover:text-luxury-dark"
            )}
          >
            {tabLabels[tab]}
            {activeTab === tab && (
              <motion.div
                layoutId="activeProductTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "description" && (
          <div className="space-y-8">
            <ProductDescription description={product.longDescription} />
            <ProductFeatures features={product.features} />
          </div>
        )}

        {activeTab === "specifications" && (
          <ProductSpecifications specifications={product.specifications} />
        )}

        {activeTab === "details" && (
          <ProductAccordion items={accordionItems} defaultOpenId="care" />
        )}
      </motion.div>
    </div>
  );
}
