import HomePage from "@/components/Landing/HomePage";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { FaqSection } from "@/components/FaqSection";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Kenat: Ethiopian Calendar Library & Date Converter",
  absoluteTitle: true,
  description:
    "Open-source Ethiopian calendar toolkit: Ethiopian ↔ Gregorian date conversion, holidays, Bahire Hasab and Ge'ez numerals for JavaScript, Python, Dart and PHP.",
  path: "/",
});

// Homepage entity graph. The WebSite and Organization nodes in the root layout share
// these @ids, so search and answer engines merge them into one Kenat entity with a
// named creator (E-E-A-T). Kept here rather than in app/layout.js: growing the root
// layout module has broken the production prerender of MDX pages (Next chunking).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}/#kenat`,
      name: "Kenat",
      description:
        "Open-source Ethiopian calendar library: date conversion, holidays, Bahire Hasab, Ge'ez numerals and headless calendar UI.",
      url: `${SITE_URL}/`,
      codeRepository: "https://github.com/MelakuDemeke/kenat",
      programmingLanguage: ["JavaScript", "TypeScript", "Python", "Dart", "PHP"],
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      author: { "@id": `${SITE_URL}/#melaku` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kenat",
      url: `${SITE_URL}/`,
      founder: { "@id": `${SITE_URL}/#melaku` },
      description:
        "Kenat is a free, open-source Ethiopian calendar toolkit for date conversion, holidays, Bahire Hasab and Ge'ez numerals in JavaScript, Python, Dart and PHP, and an Ethiopian calendar app for Android and Windows.",
      knowsAbout: ["Ethiopian calendar", "Ethiopian holidays", "Bahire Hasab", "Ethiopian time", "Ge'ez numerals", "Calendar conversion"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#melaku`,
      name: "Melaku Demeke",
      url: "https://github.com/MelakuDemeke",
      sameAs: ["https://github.com/MelakuDemeke"],
      knowsAbout: ["Ethiopian calendar", "Bahire Hasab", "Software development"],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage faq={<FaqSection faqs={HOME_FAQS} title="Ethiopian calendar questions, answered" />} />
    </>
  );
}
