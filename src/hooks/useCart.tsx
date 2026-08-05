"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  variant: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalItems: number;
  subtotal: number;
  coupon: string;
  setCoupon: (code: string) => void;
  discount: number;
  applyCoupon: (code?: string) => void;
  couponApplied: boolean;
  shipping: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, number> = {
  LUXE10: 10,
  LUXE20: 20,
  WELCOME: 15,
};

const SHIPPING_THRESHOLD = 2000;
const TAX_RATE = 0.08;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const addItem = useCallback((product: Product, quantity = 1, variant = "") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, variant }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponApplied(false);
    setDiscountPercent(0);
    setCoupon("");
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const applyCoupon = useCallback((code?: string) => {
    const upper = (code ?? coupon).toUpperCase().trim();
    if (VALID_COUPONS[upper]) {
      setDiscountPercent(VALID_COUPONS[upper]);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  }, [coupon]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const discount = useMemo(
    () => (couponApplied ? Math.round(subtotal * (discountPercent / 100)) : 0),
    [subtotal, couponApplied, discountPercent]
  );

  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 150;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + shipping + tax;
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      totalItems,
      subtotal,
      coupon,
      setCoupon,
      discount,
      applyCoupon,
      couponApplied,
      shipping,
      tax,
      total,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, isInCart, totalItems, subtotal, coupon, discount, applyCoupon, couponApplied, shipping, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
