import { JsonLd, faqLd } from "@/components/Dates/DatePageShell";

/**
 * Visible question-and-answer list plus matching FAQPage JSON-LD.
 * Answer engines only trust FAQ markup that matches text on the page, so the
 * structured data is generated from the same array that is rendered.
 */
export function FaqSection({ faqs, title = "Frequently asked questions", className = "" }) {
  if (!faqs?.length) return null;
  return (
    <section aria-labelledby="faq" className={className}>
      <JsonLd data={faqLd(faqs)} />
      <div className="max-w-3xl">
        <h2 id="faq" className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">{title}</h2>
        {/* Questions are real h3 headings (not <dt>, which may not contain headings)
            so answer engines can match each question to its answer paragraph. */}
        <div className="mt-6 divide-y divide-[var(--border)] border-y k-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="font-medium text-base">{f.q}</h3>
              <p className="mt-2 k-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
