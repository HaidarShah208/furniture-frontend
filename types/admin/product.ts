import { EntityStatus } from "./common";

export interface ProductImage {
  id: string;
  productId: string;
  image: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string | null;
  material: string | null;
  size: string | null;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  stock: number;
  status: EntityStatus;
  featured: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface CreateProductRequest {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  salePrice?: number | null;
  stock: number;
  status: EntityStatus;
  featured: boolean;
  categoryId: string;
  images?: { image: string; isPrimary: boolean }[];
  variants?: { color?: string; material?: string; size?: string; price: number; stock: number }[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}
