import { pageMetadata, SITE_URL } from "@/lib/seo";

const post = {
  title: "Kenat in 2018: From a Library I Needed to a Toolkit in Five Languages",
  description: "Ethiopian year 2018 ends today. A look back at how Kenat grew from a date-conversion library built for one project into an open-source toolkit in five languages, an Android app on Google Play, a browser extension, and a small community, with a desktop app up next.",
  path: "/blog/kenat-2018-year-in-review",
  image: "/blog/kenat-2018-cover.png",
  date: "2026-09-10",
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
