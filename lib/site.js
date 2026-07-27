/**
 * Single source of truth for the site's public origin.
 *
 * Every absolute URL — metadata, JSON-LD, the `docs` link in API error responses,
 * and the documentation's examples — derives from this, so moving domains is one
 * env var rather than a search-and-replace across the repo.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel to override. The fallback is the current
 * production deployment.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kenat-doc.vercel.app").replace(/\/+$/, "");

/** Versioned API root, e.g. https://example.com/api/v1 */
export const API_BASE = `${SITE_URL}/api/v1`;

/** Documentation root, e.g. https://example.com/doc */
export const DOCS_BASE = `${SITE_URL}/doc`;
