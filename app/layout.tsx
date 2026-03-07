import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusgamingfr.com"),
  manifest:"/manifest.json",
  title: {
    default: "Nexus Gaming FR - Bons plans Amazon gaming",
    template: "%s | Nexus Gaming FR",
  },
  description:
    "Nexus Gaming FR : les meilleurs bons plans Amazon gaming, accessoires gamer, setup, promos jeux vidéo et hardware au meilleur prix.",
  keywords: [
    "nexus gaming",
    "nexus gaming fr",
    "bons plans amazon gaming",
    "bons plans gaming",
    "promo gaming",
    "amazon gaming",
    "setup gamer",
    "accessoires gamer",
    "jeux vidéo",
    "hardware gaming",
    "pc gamer",
    "clavier gaming",
    "souris gaming",
    "casque gaming",
  ],
  alternates: {
    canonical: "https://nexusgamingfr.com",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Nexus Gaming FR - Bons plans Amazon gaming",
    description:
      "Les meilleurs bons plans Amazon gaming : accessoires gamer, setup, hardware, jeux vidéo et promos du moment.",
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
    title: "Nexus Gaming FR - Bons plans Amazon gaming",
    description:
      "Les meilleurs bons plans Amazon gaming : accessoires gamer, setup, hardware, jeux vidéo et promos du moment.",
    images: ["/ng-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexus Gaming FR",
    url: "https://nexusgamingfr.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nexusgamingfr.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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

        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}