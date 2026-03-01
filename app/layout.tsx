import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Nexus Gaming",
  description: "Shop gaming Nexus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <Cursor />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}