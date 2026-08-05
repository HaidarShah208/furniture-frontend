export interface PLPFilters {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  woodFinishes: string[];
  fabrics: string[];
  colors: string[];
  availability: string;
  collection: string;
  room: string;
  style: string;
  brand: string;
}

export interface PLPFilterOption {
  id: string;
  label: string;
  count?: number;
  swatch?: string;
}

export const defaultPLPFilters: PLPFilters = {
  categories: [],
  priceRange: [0, 15000],
  materials: [],
  woodFinishes: [],
  fabrics: [],
  colors: [],
  availability: "",
  collection: "",
  room: "",
  style: "",
  brand: "",
};
