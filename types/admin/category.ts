export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  image?: string | null;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}
