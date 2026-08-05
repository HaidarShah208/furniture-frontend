export interface LuxeCollection {
  id: string;
  name: string;
  slug: string;
  image: string;
  hoverImage: string;
  description: string;
  story: string;
  productCount: number;
  badge?: string;
  featured?: boolean;
  year: string;
  designer: string;
}
