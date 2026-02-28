"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  tag: string;
  delivery: string;
  image: string;
  specs: string[];
};

type CartItem = { product: Product; qty: number };

type CartCtx = {
  cart: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (p: Product) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const count = cart.reduce((a, it) => a + it.qty, 0);
  const subtotal = cart.reduce((a, it) => a + it.qty * it.product.price, 0);
  const shipping = subtotal >= 99 ? 0 : count ? 4.99 : 0;
  const total = subtotal + shipping;

  const api: CartCtx = useMemo(
    () => ({
      cart,
      count,
      subtotal,
      shipping,
      total,
      add(p) {
        setCart((prev) => {
          const f = prev.find((x) => x.product.id === p.id);
          if (f) return prev.map((x) => (x.product.id === p.id ? { ...x, qty: x.qty + 1 } : x));
          return [...prev, { product: p, qty: 1 }];
        });
      },
      inc(id) {
        setCart((prev) => prev.map((x) => (x.product.id === id ? { ...x, qty: x.qty + 1 } : x)));
      },
      dec(id) {
        setCart((prev) =>
          prev
            .map((x) => (x.product.id === id ? { ...x, qty: x.qty - 1 } : x))
            .filter((x) => x.qty > 0)
        );
      },
      remove(id) {
        setCart((prev) => prev.filter((x) => x.product.id !== id));
      },
      clear() {
        setCart([]);
      },
    }),
    [cart, count, subtotal, shipping, total]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}

export function euro(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}