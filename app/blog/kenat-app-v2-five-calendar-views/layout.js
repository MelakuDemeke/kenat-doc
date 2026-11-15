import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat App 2.0: Five Calendar Views, Ethiopian Time, and a Complete UI Overhaul",
  description: "The Kenat Android app ships its biggest release — five switchable calendar views, Ethiopian time display, multi-day event bars, home widget overhaul, cloud sync, and a full Material 3 redesign.",
  path: "/blog/kenat-app-v2-five-calendar-views",
  image: "/blog/kenat-app-v2-cover.png",
  date: "2026-07-21",
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
