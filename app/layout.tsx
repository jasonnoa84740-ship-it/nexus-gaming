import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata = {
  title: "Nexus Gaming",
  description: "Boutique gaming 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}