/**
 * SEO & Open Graph / Twitter Card Meta Tag Helper for Aegis BioDefense
 * Dynamically updates document title and social share preview tags for LinkedIn, Twitter, Facebook, WhatsApp, etc.
 */

export interface MetaTagOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const DEFAULT_META: MetaTagOptions = {
  title: "Aegis BioDefense | Best Pest Control Service in Delhi NCR, Gurgaon, Noida & Ghaziabad",
  description: "Aegis BioDefense provides professional 100% pet-safe pest control services across Delhi NCR including Gurugram, Noida, Ghaziabad & Faridabad. Subterranean termite radar, cockroach gel, rodent matrix & 24/7 emergency response.",
  url: "https://aegis-biodefense.com/",
  image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80",
  type: "website",
};

/**
 * Updates or creates meta tags in the document head
 */
export function updateMetaTags(options: MetaTagOptions) {
  const meta = { ...DEFAULT_META, ...options };

  // 1. Title & Primary Meta
  if (meta.title) {
    document.title = meta.title;
    setMetaContent("name", "title", meta.title);
    setMetaContent("property", "og:title", meta.title);
    setMetaContent("name", "twitter:title", meta.title);
  }

  if (meta.description) {
    setMetaContent("name", "description", meta.description);
    setMetaContent("property", "og:description", meta.description);
    setMetaContent("name", "twitter:description", meta.description);
  }

  if (meta.url) {
    setMetaContent("property", "og:url", meta.url);
    setMetaContent("name", "twitter:url", meta.url);
    
    // Update canonical link
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = meta.url;
  }

  if (meta.image) {
    setMetaContent("property", "og:image", meta.image);
    setMetaContent("name", "twitter:image", meta.image);
  }

  if (meta.type) {
    setMetaContent("property", "og:type", meta.type);
  }
}

/**
 * Reset meta tags back to default
 */
export function resetMetaTags() {
  updateMetaTags(DEFAULT_META);
}

/**
 * Helper to set or create a meta tag by attribute name & key
 */
function setMetaContent(attributeName: "name" | "property", key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attributeName}='${key}']`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, key);
    document.head.appendChild(element);
  }
  element.content = content;
}
