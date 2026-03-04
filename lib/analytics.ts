// lib/analytics.ts
type Gtag = (...args: any[]) => void;

function getGtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  return (window as any).gtag ?? null;
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", eventName, params || {});
}

export function trackAmazonClick(product: {
  id: string;
  title: string;
  category?: string;
}) {
  trackEvent("amazon_click", {
    product_id: product.id,
    product_name: product.title,
    product_category: product.category || "unknown",
  });
}

export function trackOpenDetails(product: {
  id: string;
  title: string;
  category?: string;
}) {
  trackEvent("open_details", {
    product_id: product.id,
    product_name: product.title,
    product_category: product.category || "unknown",
  });
}