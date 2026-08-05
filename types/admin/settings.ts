export interface Settings {
  id: string;
  storeName: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  facebook: string | null;
  instagram: string | null;
  logo: string | null;
  updatedAt: string;
}

export interface UpdateSettingsRequest {
  storeName?: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  logo?: string | null;
}
