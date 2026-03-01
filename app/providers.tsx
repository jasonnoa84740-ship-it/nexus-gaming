"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from "@/lib/cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ThemeProvider>
        <Cursor />
        <PageTransition>{children}</PageTransition>
      </ThemeProvider>
    </CartProvider>
  );
}