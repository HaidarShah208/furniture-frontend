import type { ProductImage } from "./image";
import type { VariantGroup, VariantCombination } from "./variant";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: ProductImage[];
  category: string;
  categorySlug: string;
  collection: string;
  description: string;
  longDescription: string;
  badge?: string;
  rating: number;
  reviews: number;
  sku: string;
  material: string;
  dimensions: string;
  availability: "in-stock" | "pre-order" | "out-of-stock";
  estimatedDelivery: string;
  variants: VariantGroup[];
  variantCombinations: VariantCombination[];
  specifications: ProductSpecification[];
  careInstructions: string[];
  shippingInfo: string;
  warrantyInfo: string;
  features: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductCardProps {
  product: Product;
  index?: number;
}
