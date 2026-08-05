import type { LuxeCollection } from "@/types/collection";
import type { PLPFilterOption } from "@/types/filter";

export const collections: LuxeCollection[] = [
  {
    id: "col-1",
    name: "Modern Minimalist",
    slug: "modern-minimalist",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    description: "Clean lines and understated elegance for the contemporary home",
    story: "Inspired by Scandinavian design philosophy, the Modern Minimalist collection celebrates the beauty of simplicity. Each piece is thoughtfully designed to combine functionality with refined aesthetics, using premium natural materials and expert craftsmanship. The collection emphasizes open spaces, natural light, and a sense of calm that transforms any room into a sanctuary of modern living.",
    productCount: 48,
    badge: "Trending",
    featured: true,
    year: "2026",
    designer: "Studio Aether",
  },
  {
    id: "col-2",
    name: "Classic Heritage",
    slug: "classic-heritage",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80",
    description: "Timeless designs inspired by centuries of European craftsmanship",
    story: "The Classic Heritage collection draws from the rich tapestry of European furniture-making traditions. Every piece pays homage to the master craftsmen of Florence, Paris, and Copenhagen, while incorporating modern comfort standards. Hand-carved details, rich wood tones, and sumptuous upholstery create an atmosphere of enduring sophistication that transcends passing trends.",
    productCount: 36,
    year: "2025",
    designer: "Maison Laurent",
  },
  {
    id: "col-3",
    name: "Urban Luxe",
    slug: "urban-luxe",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=900&q=80",
    description: "Bold statements for sophisticated urban living spaces",
    story: "Urban Luxe is for the design-forward individual who sees their home as a canvas for self-expression. This collection marries industrial elements with luxury materials — think brushed brass against Italian marble, geometric forms softened by premium leather. Each piece makes a statement while maintaining the warmth and comfort essential to truly living well in the city.",
    productCount: 52,
    badge: "New",
    featured: true,
    year: "2026",
    designer: "Atelier Noir",
  },
  {
    id: "col-4",
    name: "Coastal Retreat",
    slug: "coastal-retreat",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80",
    description: "Relaxed luxury inspired by seaside living and natural textures",
    story: "The Coastal Retreat collection captures the essence of refined beachside living. Natural rattan, weathered teak, and organic linens create a palette of calm sophistication. Whether for a waterfront villa or an urban apartment longing for seaside tranquility, these pieces bring the serene beauty of the coast into your everyday life.",
    productCount: 28,
    year: "2026",
    designer: "Studio Mare",
  },
  {
    id: "col-5",
    name: "Art Deco Revival",
    slug: "art-deco-revival",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80",
    description: "Glamorous pieces that echo the golden age of design",
    story: "Our Art Deco Revival collection reinterprets the glamour and geometric precision of the 1920s for modern living. Rich velvets, lacquered surfaces, and precious metal accents create an atmosphere of refined decadence. Each piece is a conversation starter, designed to make your space feel like a scene from a beautifully art-directed film.",
    productCount: 24,
    badge: "Limited",
    year: "2025",
    designer: "Maison Dor",
  },
  {
    id: "col-6",
    name: "Japandi Harmony",
    slug: "japandi-harmony",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80",
    description: "The perfect fusion of Japanese wabi-sabi and Scandinavian hygge",
    story: "Japandi Harmony brings together two of the world's most admired design philosophies. The result is furniture that celebrates imperfection, natural materials, and mindful living. Clean Scandinavian silhouettes meet Japanese craftsmanship techniques, creating pieces that are both visually serene and deeply functional.",
    productCount: 32,
    featured: true,
    year: "2026",
    designer: "Kaze Studio",
  },
];

export function getCollectionBySlug(slug: string): LuxeCollection | undefined {
  return collections.find((c) => c.slug === slug);
}

export const plpMaterialOptions: PLPFilterOption[] = [
  { id: "solid-wood", label: "Solid Wood", count: 86 },
  { id: "marble", label: "Marble", count: 34 },
  { id: "leather", label: "Italian Leather", count: 52 },
  { id: "velvet", label: "Velvet", count: 28 },
  { id: "brass", label: "Brushed Brass", count: 41 },
  { id: "glass", label: "Tempered Glass", count: 19 },
  { id: "linen", label: "European Linen", count: 37 },
  { id: "rattan", label: "Natural Rattan", count: 15 },
];

export const plpWoodOptions: PLPFilterOption[] = [
  { id: "walnut", label: "Natural Walnut", swatch: "#5C4033" },
  { id: "oak", label: "White Oak", swatch: "#C4A882" },
  { id: "ebony", label: "Ebony", swatch: "#2C2C2C" },
  { id: "teak", label: "Aged Teak", swatch: "#8B6914" },
  { id: "maple", label: "Maple", swatch: "#D2B48C" },
];

export const plpFabricOptions: PLPFilterOption[] = [
  { id: "linen", label: "Belgian Linen", swatch: "#D4C5A9" },
  { id: "velvet", label: "Italian Velvet", swatch: "#4A5568" },
  { id: "leather", label: "Full-Grain Leather", swatch: "#8B4513" },
  { id: "boucle", label: "Bouclé", swatch: "#F5F0E8" },
];

export const plpColorOptions: PLPFilterOption[] = [
  { id: "natural", label: "Natural", swatch: "#C4A882" },
  { id: "noir", label: "Noir", swatch: "#1A1A1A" },
  { id: "ivory", label: "Ivory", swatch: "#FFFFF0" },
  { id: "slate", label: "Slate", swatch: "#708090" },
  { id: "cognac", label: "Cognac", swatch: "#8B4513" },
  { id: "sage", label: "Sage", swatch: "#9CAF88" },
  { id: "gold", label: "Antique Gold", swatch: "#B08D57" },
];

export const plpRoomOptions: PLPFilterOption[] = [
  { id: "living", label: "Living Room", count: 64 },
  { id: "bedroom", label: "Bedroom", count: 42 },
  { id: "dining", label: "Dining Room", count: 38 },
  { id: "office", label: "Home Office", count: 26 },
  { id: "outdoor", label: "Outdoor", count: 18 },
];

export const plpStyleOptions: PLPFilterOption[] = [
  { id: "modern", label: "Modern" },
  { id: "traditional", label: "Traditional" },
  { id: "transitional", label: "Transitional" },
  { id: "contemporary", label: "Contemporary" },
  { id: "mid-century", label: "Mid-Century" },
];
