import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusgamingfr.com"),
  title: "Nexus Gaming FR",
  description: "Nexus Gaming FR : bons plans gaming, actus et contenu pour les passionnés de jeux vidéo.",
};

const GA_ID = "G-F3BLLTBHYK";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexus Gaming FR",
    url: "https://nexusgamingfr.com",
    logo: "https://nexusgamingfr.com/ng-logo.png",
  };

  return (
    <html lang="fr">
      <head>
        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true
            });
          `}
        </Script>

        {/* SEO / Google structured data */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}