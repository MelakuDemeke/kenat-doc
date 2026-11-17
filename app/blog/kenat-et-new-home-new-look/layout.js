import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat Moves to kenat.et, With a New Look",
  description: "The Kenat site has a new address, kenat.et, a cleaner modern design, live Ethiopian date pages for today, every holiday and every year, and a showcase of the apps built with Kenat.",
  path: "/blog/kenat-et-new-home-new-look",
  image: "/blog/kenat-et-cover.png",
  date: "2026-10-15",
};

export const metadata = pageMetadata({ ...post, type: "article", publishedTime: post.date });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: `${SITE_URL}${post.image}`,
  datePublished: post.date,
  dateModified: post.date,
  url: `${SITE_URL}${post.path}`,
  mainEntityOfPage: `${SITE_URL}${post.path}`,
  author: { "@type": "Person", name: "Melaku Demeke", url: "https://github.com/MelakuDemeke" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
