import { SITE } from "@/constants/site";

/**
 * Creates consistent page metadata for SEO.
 * @param {Object} options
 * @param {string} options.title
 * @param {string} [options.description]
 * @param {string} [options.path]
 * @returns {import('next').Metadata}
 */
export function createMetadata({ title, description, path = "" }) {
  const pageTitle = title === SITE.name ? title : `${title} | ${SITE.name}`;
  const pageDescription = description || SITE.description;
  const url = `${SITE.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
