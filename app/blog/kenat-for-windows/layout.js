import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat, Now on Windows",
  description: "Kenat for Windows brings the Ethiopian calendar to your PC — a landscape calendar, the date in the tray, desktop and Widgets Board widgets, keyboard shortcuts and sync with your phone. Plus what's new in Kenat 2.3 on Android.",
  path: "/blog/kenat-for-windows",
  image: "/blog/kenat-windows-cover.png",
  date: "2026-11-15",
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
