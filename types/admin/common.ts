export type EntityStatus = "active" | "draft" | "archived";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type PaymentMethod = "cod" | "card" | "bank_transfer" | "paypal";

export interface StatusStyle {
  bg: string;
  text: string;
}

export const orderStatusStyles: Record<OrderStatus, StatusStyle> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700" },
  processing: { bg: "bg-blue-50", text: "text-blue-700" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-700" },
};

export const productStatusStyles: Record<EntityStatus, StatusStyle> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700" },
  draft: { bg: "bg-amber-50", text: "text-amber-700" },
  archived: { bg: "bg-gray-100", text: "text-gray-600" },
};
