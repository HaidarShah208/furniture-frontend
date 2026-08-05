import type { Category, FilterOption } from "@/types/category";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Modern Living Room",
    slug: "modern-living-room",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    itemCount: 48,
    description: "Contemporary sofas, chairs, and coffee tables designed for refined living",
    badge: "Trending",
    startingPrice: 1290,
    collection: "Modern Minimalist",
  },
  {
    id: "cat-2",
    name: "Luxury Bedroom",
    slug: "luxury-bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    itemCount: 36,
    description: "Handcrafted bed frames, nightstands, and dressers for serene retreats",
    startingPrice: 2450,
    collection: "Classic Heritage",
  },
  {
    id: "cat-3",
    name: "Elegant Dining",
    slug: "elegant-dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    itemCount: 28,
    description: "Dining tables and chairs crafted for memorable gatherings",
    badge: "New Collection",
    startingPrice: 1890,
    collection: "Urban Luxe",
  },
  {
    id: "cat-4",
    name: "Executive Office",
    slug: "executive-office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    itemCount: 22,
    description: "Professional desks, ergonomic chairs, and storage solutions",
    startingPrice: 980,
    collection: "Modern Minimalist",
  },
  {
    id: "cat-5",
    name: "Outdoor Living",
    slug: "outdoor-living",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    itemCount: 18,
    description: "Weather-resistant furniture for patios, gardens, and terraces",
    startingPrice: 1650,
    collection: "Urban Luxe",
  },
  {
    id: "cat-6",
    name: "Designer Lighting",
    slug: "designer-lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80",
    itemCount: 42,
    description: "Statement chandeliers, pendants, and sculptural floor lamps",
    badge: "Best Seller",
    startingPrice: 450,
    collection: "Classic Heritage",
  },
  {
    id: "cat-7",
    name: "Storage & Shelving",
    slug: "storage-shelving",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
    itemCount: 31,
    description: "Bookshelves, cabinets, and display units with architectural elegance",
    startingPrice: 780,
    collection: "Modern Minimalist",
  },
  {
    id: "cat-8",
    name: "Accent Furniture",
    slug: "accent-furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    itemCount: 56,
    description: "Console tables, side tables, and statement pieces for every room",
    badge: "Curated",
    startingPrice: 390,
    collection: "Urban Luxe",
  },
];

export const materialOptions: FilterOption[] = [
  { id: "solid-wood", label: "Solid Wood", count: 86 },
  { id: "marble", label: "Marble", count: 34 },
  { id: "leather", label: "Italian Leather", count: 52 },
  { id: "velvet", label: "Velvet", count: 28 },
  { id: "brass", label: "Brushed Brass", count: 41 },
  { id: "glass", label: "Tempered Glass", count: 19 },
  { id: "linen", label: "European Linen", count: 37 },
];

export const colorOptions: FilterOption[] = [
  { id: "natural", label: "Natural Oak", count: 64 },
  { id: "walnut", label: "Walnut", count: 48 },
  { id: "black", label: "Matte Black", count: 39 },
  { id: "white", label: "Ivory White", count: 55 },
  { id: "grey", label: "Stone Grey", count: 31 },
  { id: "gold", label: "Antique Gold", count: 22 },
];

export const collectionOptions: FilterOption[] = [
  { id: "modern-minimalist", label: "Modern Minimalist", count: 101 },
  { id: "classic-heritage", label: "Classic Heritage", count: 78 },
  { id: "urban-luxe", label: "Urban Luxe", count: 102 },
];

export const sortOptions: FilterOption[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "popular", label: "Most Popular" },
];
