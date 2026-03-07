import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusgamingfr.com"),
  title: "Nexus Gaming FR",
  description:
    "Nexus Gaming FR : bons plans gaming, actus et contenu pour les passionnés de jeux vidéo.",
  keywords: [
    "nexus gaming",
    "nexus gaming fr",
    "gaming",
    "jeux vidéo",
    "bons plans gaming",
    "actus gaming",
  ],
  openGraph: {
    title: "Nexus Gaming FR",
    description:
      "Nexus Gaming FR : bons plans gaming, actus et contenu pour les passionnés de jeux vidéo.",
    url: "https://nexusgamingfr.com",
    siteName: "Nexus Gaming FR",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/ng-logo.png",
        width: 1200,
        height: 630,
        alt: "Nexus Gaming FR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Gaming FR",
    description:
      "Nexus Gaming FR : bons plans gaming, actus et contenu pour les passionnés de jeux vidéo.",
    images: ["/ng-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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