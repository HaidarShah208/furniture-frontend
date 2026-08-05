export interface VariantOption {
  id: string;
  label: string;
  value: string;
  swatch?: string;
  available: boolean;
}

export interface VariantGroup {
  id: string;
  name: string;
  type: "color" | "swatch" | "button";
  options: VariantOption[];
}

export interface SelectedVariants {
  [groupId: string]: string;
}

export interface VariantCombination {
  variantIds: string[];
  price: number;
  originalPrice?: number;
  sku: string;
  available: boolean;
  image?: string;
}
