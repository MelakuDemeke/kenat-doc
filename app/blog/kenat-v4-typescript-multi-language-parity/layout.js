import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat v2 / v4: A TypeScript Core, Full Python & Dart Parity, a New PHP Port, and a Rebuilt Docs Site",
  description: "The core library moved to TypeScript, Python and Dart were brought to full feature parity, a brand-new PHP port shipped from scratch, and the docs site got a full refresh.",
  path: "/blog/kenat-v4-typescript-multi-language-parity",
  image: "/blog/kenat-v4-cover.png",
  date: "2026-07-12",
};

export const metadata = pageMetadata({ ...post, type: "article", publishedTime: post.date });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: `${SITE_URL}${post.image}`,
  datePublished: post.date,
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
