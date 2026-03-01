import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
         {children}
          <div className="nx-watermark" />
      </body>
    </html>
  );
}