/**
 * Shared SEO helpers. Every indexable page should get its own canonical URL and
 * its own Open Graph / Twitter title, otherwise it inherits the homepage's.
 */
export const SITE_URL = "https://kenat.et";
export const SITE_NAME = "Kenat";
export const DEFAULT_OG_IMAGE = {
  url: "/ogimage.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Kenat: the Ethiopian calendar, computed for your code",
};

/**
 * Build a complete Next.js metadata object for one page.
 * @param {object} o
 * @param {string} o.title        page title (the root template appends " | Kenat")
 * @param {string} o.description  150–160 character summary
 * @param {string} o.path         canonical path, e.g. "/doc/installation"
 * @param {string} [o.image]      social image path, defaults to /ogimage.jpg
 * @param {"website"|"article"} [o.type]
 * @param {boolean} [o.absoluteTitle] skip the " | Kenat" template
 * @param {string[]} [o.keywords]
 */
export function pageMetadata({ title, description, path, image, type = "website", absoluteTitle = false, keywords, publishedTime }) {
  const images = image ? [{ url: image, width: 1200, height: 630 }] : [DEFAULT_OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images,
      ...(publishedTime && { publishedTime, authors: ["Melaku Demeke"] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}
