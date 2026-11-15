import HomePage from "@/components/Landing/HomePage";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kenat: Ethiopian Calendar Library & Date Converter",
  absoluteTitle: true,
  description:
    "Kenat is an open-source Ethiopian calendar toolkit: Ethiopian ↔ Gregorian date conversion, holidays, Bahire Hasab and Ge'ez numerals for JavaScript, Python, Dart and PHP.",
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Kenat",
  description:
    "Open-source Ethiopian calendar library: date conversion, holidays, Bahire Hasab, Ge'ez numerals and headless calendar UI.",
  url: SITE_URL,
  codeRepository: "https://github.com/MelakuDemeke/kenat",
  programmingLanguage: ["JavaScript", "TypeScript", "Python", "Dart", "PHP"],
  license: "https://opensource.org/licenses/MIT",
  author: { "@type": "Person", name: "Melaku Demeke", url: "https://github.com/MelakuDemeke" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}
