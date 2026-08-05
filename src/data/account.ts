export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface OrderTrackingStep {
  label: string;
  date: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  tracking: OrderTrackingStep[];
}

export const mockProfile: UserProfile = {
  firstName: "Alexander",
  lastName: "Mitchell",
  email: "alexander.mitchell@example.com",
  phone: "+1 (555) 234-5678",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  joinDate: "Member since January 2024",
};

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "Alexander",
    lastName: "Mitchell",
    address: "742 Evergreen Terrace",
    apartment: "Apt 12B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (555) 234-5678",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    firstName: "Alexander",
    lastName: "Mitchell",
    address: "350 Fifth Avenue",
    apartment: "Suite 3400",
    city: "New York",
    state: "NY",
    zip: "10118",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: "LUXE-7K3M9PVQ",
    date: "Jul 28, 2026",
    status: "delivered",
    items: [
      {
        id: "prod-1",
        name: "Aria Lounge Chair",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60",
        variant: "Cognac / Natural Walnut",
        price: 2450,
        quantity: 1,
        slug: "aria-lounge-chair",
      },
    ],
    subtotal: 2450,
    shipping: 0,
    tax: 196,
    discount: 0,
    total: 2646,
    paymentMethod: "Visa •••• 4242",
    shippingAddress: "742 Evergreen Terrace, Apt 12B, New York, NY 10001",
    tracking: [
      { label: "Order Placed", date: "Jul 28, 2026", completed: true },
      { label: "Payment Confirmed", date: "Jul 28, 2026", completed: true },
      { label: "In Production", date: "Jul 30, 2026", completed: true },
      { label: "Shipped", date: "Aug 2, 2026", completed: true },
      { label: "Delivered", date: "Aug 5, 2026", completed: true },
    ],
  },
  {
    id: "LUXE-2F8N4TXR",
    date: "Aug 1, 2026",
    status: "shipped",
    items: [
      {
        id: "prod-2",
        name: "Luna Dining Table",
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200&q=60",
        variant: "8 Seater / Calacatta",
        price: 3890,
        quantity: 1,
        slug: "luna-dining-table",
      },
      {
        id: "prod-4",
        name: "Nova Bookshelf",
        image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=200&q=60",
        variant: "Brushed Brass",
        price: 1890,
        quantity: 1,
        slug: "nova-bookshelf",
      },
    ],
    subtotal: 5780,
    shipping: 0,
    tax: 462,
    discount: 578,
    total: 5664,
    paymentMethod: "Mastercard •••• 8888",
    shippingAddress: "350 Fifth Avenue, Suite 3400, New York, NY 10118",
    tracking: [
      { label: "Order Placed", date: "Aug 1, 2026", completed: true },
      { label: "Payment Confirmed", date: "Aug 1, 2026", completed: true },
      { label: "In Production", date: "Aug 3, 2026", completed: true },
      { label: "Shipped", date: "Aug 4, 2026", completed: true },
      { label: "Delivered", date: "", completed: false },
    ],
  },
  {
    id: "LUXE-9C5W1HJL",
    date: "Aug 4, 2026",
    status: "processing",
    items: [
      {
        id: "prod-3",
        name: "Serene Sofa Collection",
        image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=200&q=60",
        variant: "Oatmeal Linen / L-Shape",
        price: 5200,
        quantity: 1,
        slug: "serene-sofa-collection",
      },
    ],
    subtotal: 5200,
    shipping: 0,
    tax: 416,
    discount: 0,
    total: 5616,
    paymentMethod: "PayPal",
    shippingAddress: "742 Evergreen Terrace, Apt 12B, New York, NY 10001",
    tracking: [
      { label: "Order Placed", date: "Aug 4, 2026", completed: true },
      { label: "Payment Confirmed", date: "Aug 4, 2026", completed: true },
      { label: "In Production", date: "", completed: false },
      { label: "Shipped", date: "", completed: false },
      { label: "Delivered", date: "", completed: false },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}
