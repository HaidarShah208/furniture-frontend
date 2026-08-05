export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
  badge?: string;
  startingPrice: number;
  collection: string;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface CategoryFilters {
  category: string;
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  availability: string;
  collection: string;
  sortBy: string;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}
