import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat App: Holiday Artwork, Tasks, and Widgets That Dress for the Day",
  description: "Build 8 of the Kenat Android app adds illustrated artwork for every major holiday, full-screen celebrations tuned to each holiday's tone, tasks alongside events, event recurrence, and three new home widgets.",
  path: "/blog/kenat-app-holiday-artwork-tasks-widgets",
  image: "/blog/kenat-holidays-cover.png",
  date: "2026-08-20",
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
