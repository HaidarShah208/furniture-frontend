export type SortOption =
  | "newest"
  | "featured"
  | "price-low"
  | "price-high"
  | "popularity"
  | "best-selling";

export interface SortOptionItem {
  id: SortOption;
  label: string;
}

export const sortOptions: SortOptionItem[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "popularity", label: "Most Popular" },
  { id: "best-selling", label: "Best Selling" },
];
