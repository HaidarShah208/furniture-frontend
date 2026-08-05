"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MegaMenuColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface MegaMenuFeatured {
  title: string;
  image: string;
  href: string;
}

interface MegaMenuData {
  columns: MegaMenuColumn[];
  featured: MegaMenuFeatured;
}

const collectionsMenu: MegaMenuData = {
  columns: [
    {
      title: "By Style",
      links: [
        { label: "Modern Minimalist", href: "/collections/modern-minimalist" },
        { label: "Classic Heritage", href: "/collections/classic-heritage" },
        { label: "Urban Luxe", href: "/collections/urban-luxe" },
        { label: "Coastal Retreat", href: "/collections/coastal-retreat" },
        { label: "Art Deco Revival", href: "/collections/art-deco-revival" },
        { label: "Japandi Harmony", href: "/collections/japandi-harmony" },
      ],
    },
    {
      title: "By Room",
      links: [
        { label: "Living Room", href: "/categories" },
        { label: "Bedroom", href: "/categories" },
        { label: "Dining Room", href: "/categories" },
        { label: "Home Office", href: "/categories" },
        { label: "Outdoor", href: "/categories" },
      ],
    },
    {
      title: "By Material",
      links: [
        { label: "Solid Wood", href: "/categories" },
        { label: "Italian Marble", href: "/categories" },
        { label: "Italian Leather", href: "/categories" },
        { label: "European Linen", href: "/categories" },
        { label: "Brushed Brass", href: "/categories" },
      ],
    },
  ],
  featured: {
    title: "New: Japandi Harmony",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80",
    href: "/collections/japandi-harmony",
  },
};

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" as const }}
      className="absolute left-0 right-0 top-full border-b border-luxury-border bg-white luxury-shadow-lg"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-8 py-10">
        {collectionsMenu.columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-luxury-gold">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-sm text-luxury-text transition-colors duration-200 hover:text-luxury-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          href={collectionsMenu.featured.href}
          onClick={onClose}
          className="group relative overflow-hidden rounded-xl"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={collectionsMenu.featured.image}
              alt={collectionsMenu.featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-luxury-gold">
                Featured
              </p>
              <p className="text-sm font-bold text-white">
                {collectionsMenu.featured.title}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/80 transition-colors group-hover:text-white">
                Explore
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
