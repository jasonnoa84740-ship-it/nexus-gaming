import "./globals.css";
import { CartProvider } from "./lib/cart";

export const metadata = {
  title: "Nexus Gaming",
  description: "Boutique 100% gaming",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Fond global */}
        <div className="nx-bg">
          <div className="nx-grid" />
          <div className="nx-blob one" />
          <div className="nx-blob two" />
          <div className="nx-blob three" />
          <div className="nx-noise" />
        </div>

        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}