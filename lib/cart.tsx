"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: string;
  brand: string;
  name: string;

  // utile pour le filtre catégories
  category: string;

  price: number;
  oldPrice?: number;

  // chips UI
  badge?: string;
  desc?: string;

  ship: string;
  image: string;
};

type CartItem = { product: Product; qty: number };

export function euro(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

type CartCtx = {
  cart: CartItem[];
  add: (p: Product, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = (p: Product, qty: number = 1) => {
    const q = Math.max(1, Math.floor(qty || 1));
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.product.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + q };
        return copy;
      }
      return [...prev, { product: p, qty: q }];
    });
  };

  const inc = (id: string) =>
    setCart((p) =>
      p.map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it))
    );

  const dec = (id: string) =>
    setCart((p) =>
      p.map((it) =>
        it.product.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );

  const remove = (id: string) =>
    setCart((p) => p.filter((it) => it.product.id !== id));

  const clear = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.qty * it.product.price, 0),
    [cart]
  );

  // livraison offerte dès 99€
  const shipping = subtotal >= 99 ? 0 : cart.length ? 4.99 : 0;
  const total = subtotal + shipping;
  const count = cart.reduce((s, it) => s + it.qty, 0);

  const value: CartCtx = {
    cart,
    add,
    inc,
    dec,
    remove,
    clear,
    subtotal,
    shipping,
    total,
    count,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}