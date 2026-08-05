export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  email: string;
  city: string;
  total: number;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  shippingAddress: string;
  notes: string;
  items: { id: string; name: string; image: string; variant: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
  gallery: string[];
  description: string;
  material: string;
  dimensions: string;
  variants: string[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface StoreSettings {
  storeName: string;
  logo: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
}

export const adminOrders: AdminOrder[] = [
  {
    id: "LUXE-7K3M9PVQ",
    customer: "Alexander Mitchell",
    phone: "+1 (555) 234-5678",
    email: "alexander@example.com",
    city: "New York",
    total: 2646,
    paymentMethod: "Visa •••• 4242",
    status: "delivered",
    date: "Jul 28, 2026",
    shippingAddress: "742 Evergreen Terrace, Apt 12B, New York, NY 10001",
    notes: "Please deliver before noon.",
    items: [{ id: "prod-1", name: "Aria Lounge Chair", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60", variant: "Cognac / Natural Walnut", price: 2450, quantity: 1 }],
    subtotal: 2450, shipping: 0, tax: 196, discount: 0,
  },
  {
    id: "LUXE-2F8N4TXR",
    customer: "Sophia Reynolds",
    phone: "+1 (555) 987-6543",
    email: "sophia@example.com",
    city: "Los Angeles",
    total: 5664,
    paymentMethod: "Mastercard •••• 8888",
    status: "shipped",
    date: "Aug 1, 2026",
    shippingAddress: "350 Fifth Avenue, Suite 3400, New York, NY 10118",
    notes: "",
    items: [
      { id: "prod-2", name: "Luna Dining Table", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200&q=60", variant: "8 Seater / Calacatta", price: 3890, quantity: 1 },
      { id: "prod-4", name: "Nova Bookshelf", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=200&q=60", variant: "Brushed Brass", price: 1890, quantity: 1 },
    ],
    subtotal: 5780, shipping: 0, tax: 462, discount: 578,
  },
  {
    id: "LUXE-9C5W1HJL",
    customer: "James Thornton",
    phone: "+1 (555) 111-2233",
    email: "james@example.com",
    city: "Chicago",
    total: 5616,
    paymentMethod: "PayPal",
    status: "processing",
    date: "Aug 4, 2026",
    shippingAddress: "1600 Pennsylvania Ave, Chicago, IL 60601",
    notes: "Ring doorbell on arrival.",
    items: [{ id: "prod-3", name: "Serene Sofa Collection", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=200&q=60", variant: "Oatmeal Linen / L-Shape", price: 5200, quantity: 1 }],
    subtotal: 5200, shipping: 0, tax: 416, discount: 0,
  },
  {
    id: "LUXE-4D7R2MKP",
    customer: "Elena Marchetti",
    phone: "+1 (555) 444-5566",
    email: "elena@example.com",
    city: "Miami",
    total: 1490,
    paymentMethod: "Visa •••• 1234",
    status: "pending",
    date: "Aug 5, 2026",
    shippingAddress: "900 Biscayne Blvd, Apt 4501, Miami, FL 33132",
    notes: "",
    items: [{ id: "prod-5", name: "Zen Coffee Table", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&q=60", variant: "Natural Oak", price: 1290, quantity: 1 }],
    subtotal: 1290, shipping: 150, tax: 103, discount: 53,
  },
  {
    id: "LUXE-8B6T3NWQ",
    customer: "Marco Bellini",
    phone: "+1 (555) 777-8899",
    email: "marco@example.com",
    city: "San Francisco",
    total: 4340,
    paymentMethod: "Amex •••• 9999",
    status: "cancelled",
    date: "Jul 20, 2026",
    shippingAddress: "1 Market St, San Francisco, CA 94105",
    notes: "Customer requested cancellation.",
    items: [{ id: "prod-1", name: "Aria Lounge Chair", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60", variant: "Cognac / Natural Walnut", price: 2450, quantity: 1 },
      { id: "prod-4", name: "Nova Bookshelf", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=200&q=60", variant: "Brushed Brass", price: 1890, quantity: 1 }],
    subtotal: 4340, shipping: 0, tax: 0, discount: 0,
  },
];

export const adminProducts: AdminProduct[] = [
  { id: "prod-1", name: "Aria Lounge Chair", slug: "aria-lounge-chair", category: "Living Room", price: 2450, stock: 12, status: "active", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60", gallery: [], description: "Hand-sculpted walnut frame with premium Italian leather upholstery", material: "Solid Walnut & Italian Leather", dimensions: "W 78cm × D 82cm × H 76cm", variants: ["Cognac", "Black", "Tan"] },
  { id: "prod-2", name: "Luna Dining Table", slug: "luna-dining-table", category: "Dining Room", price: 3890, originalPrice: 4200, stock: 5, status: "active", image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200&q=60", gallery: [], description: "Calacatta marble top with brushed brass base", material: "Marble & Brass", dimensions: "W 220cm × D 100cm × H 76cm", variants: ["6 Seater", "8 Seater"] },
  { id: "prod-3", name: "Serene Sofa Collection", slug: "serene-sofa-collection", category: "Living Room", price: 5200, stock: 3, status: "active", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=200&q=60", gallery: [], description: "Modular L-shape sofa in premium linen", material: "Linen & Solid Oak", dimensions: "W 320cm × D 180cm × H 85cm", variants: ["Oatmeal", "Charcoal", "Navy"] },
  { id: "prod-4", name: "Nova Bookshelf", slug: "nova-bookshelf", category: "Living Room", price: 1890, stock: 8, status: "active", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=200&q=60", gallery: [], description: "Open-frame bookshelf in brushed brass and tempered glass", material: "Brass & Glass", dimensions: "W 120cm × D 35cm × H 200cm", variants: ["Brushed Brass", "Matte Black"] },
  { id: "prod-5", name: "Zen Coffee Table", slug: "zen-coffee-table", category: "Living Room", price: 1290, stock: 0, status: "active", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&q=60", gallery: [], description: "Minimalist coffee table in natural oak with stone inlay", material: "Oak & Stone", dimensions: "W 120cm × D 60cm × H 42cm", variants: ["Natural Oak", "Dark Walnut"] },
  { id: "prod-6", name: "Heritage Armoire", slug: "heritage-armoire", category: "Bedroom", price: 4500, stock: 2, status: "draft", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=60", gallery: [], description: "Hand-carved solid mahogany wardrobe with brass fittings", material: "Mahogany & Brass", dimensions: "W 150cm × D 60cm × H 210cm", variants: ["Natural", "Dark Stain"] },
];

export const adminCategories: AdminCategory[] = [
  { id: "cat-1", name: "Living Room", slug: "living-room", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=60", productCount: 48 },
  { id: "cat-2", name: "Bedroom", slug: "bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&q=60", productCount: 36 },
  { id: "cat-3", name: "Dining Room", slug: "dining-room", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=60", productCount: 28 },
  { id: "cat-4", name: "Office", slug: "office", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=60", productCount: 22 },
  { id: "cat-5", name: "Outdoor", slug: "outdoor", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&q=60", productCount: 18 },
];

export const storeSettings: StoreSettings = {
  storeName: "LUXE Furniture",
  logo: "",
  phone: "+1 (800) LUXE-000",
  whatsapp: "+1 (800) 589-3000",
  email: "hello@luxe-furniture.com",
  address: "350 Fifth Avenue, Suite 4200, Manhattan, NY 10118",
  facebook: "https://facebook.com/luxefurniture",
  instagram: "https://instagram.com/luxefurniture",
};

export function getAdminOrderById(id: string): AdminOrder | undefined {
  return adminOrders.find((o) => o.id === id);
}

export function getAdminProductById(id: string): AdminProduct | undefined {
  return adminProducts.find((p) => p.id === id);
}
