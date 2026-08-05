"use client";

import { motion } from "framer-motion";
import type { ProductSpecification } from "@/types/product";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-luxury-border bg-white"
    >
      <table className="w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={spec.label}
              className={index % 2 === 0 ? "bg-luxury-muted-bg/50" : "bg-white"}
            >
              <td className="px-6 py-3.5 text-sm font-semibold text-luxury-dark">
                {spec.label}
              </td>
              <td className="px-6 py-3.5 text-sm text-luxury-secondary">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
