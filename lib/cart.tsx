"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  ship: string;
  image: string;
  details: string[];
};

type CartItem = { product: Product; qty: number };

function euro(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

type CartCtx = {
  cart: CartItem[];
  add: (p: Product) => void;
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

  const add = (p: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.product.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const inc = (id: string) => setCart((p) => p.map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id: string) =>
    setCart((p) =>
      p
        .map((it) => (it.product.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))
    );

  const remove = (id: string) => setCart((p) => p.filter((it) => it.product.id !== id));
  const clear = () => setCart([]);

  const subtotal = useMemo(() => cart.reduce((s, it) => s + it.qty * it.product.price, 0), [cart]);

  // règle simple livraison: offerte dès 99€, sinon 4.99€
  const shipping = subtotal >= 99 ? 0 : cart.length ? 4.99 : 0;
  const total = subtotal + shipping;
  const count = cart.reduce((s, it) => s + it.qty, 0);

  const value: CartCtx = { cart, add, inc, dec, remove, clear, subtotal, shipping, total, count };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { euro };