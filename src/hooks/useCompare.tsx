"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Product } from "@/types/product";

const MAX_COMPARE = 4;

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => boolean;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  totalItems: number;
  isFull: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isFull = items.length >= MAX_COMPARE;

  const addItem = useCallback(
    (product: Product): boolean => {
      let added = false;
      setItems((prev) => {
        if (prev.some((i) => i.id === product.id)) return prev;
        if (prev.length >= MAX_COMPARE) return prev;
        added = true;
        return [...prev, product];
      });
      return added;
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const toggleItem = useCallback(
    (product: Product): boolean => {
      let added = false;
      setItems((prev) => {
        if (prev.some((i) => i.id === product.id)) {
          return prev.filter((i) => i.id !== product.id);
        }
        if (prev.length >= MAX_COMPARE) return prev;
        added = true;
        return [...prev, product];
      });
      return added;
    },
    []
  );

  const isInCompare = useCallback(
    (productId: string) => items.some((i) => i.id === productId),
    [items]
  );

  const clearCompare = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      toggleItem,
      isInCompare,
      clearCompare,
      totalItems: items.length,
      isFull,
      drawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [items, addItem, removeItem, toggleItem, isInCompare, clearCompare, isFull, drawerOpen, openDrawer, closeDrawer]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextType {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
