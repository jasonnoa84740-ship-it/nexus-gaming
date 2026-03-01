import "./globals.css";
import { CartProvider } from "@/lib/cart";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
       <div className="nx-watermark" />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}