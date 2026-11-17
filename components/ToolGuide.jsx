import Link from "next/link";
import { PACKAGES } from "@/lib/toolGuides";

/**
 * Server-rendered explanation under an interactive tool: what it does (a direct answer
 * that search and AI engines can quote), how to use it, worked examples, the matching
 * library call, and links into the docs and related pages.
 */
export function ToolGuide({ guide, className = "" }) {
  if (!guide) return null;
  return (
    <section aria-labelledby="about-tool" className={className}>
      <div className="max-w-3xl">
        <h2 id="about-tool" className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
          About the {guide.name}
        </h2>
        <p className="mt-4 text-lg leading-relaxed">{guide.answer}</p>

        <h3 className="mt-10 text-lg font-semibold">How to use it</h3>
        <ol className="mt-3 list-decimal pl-5 space-y-1.5 k-muted leading-relaxed">
          {guide.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>

        <h3 className="mt-10 text-lg font-semibold">Examples</h3>
        <table className="mt-3 w-full text-left text-sm sm:text-base border-y k-border">
          <thead className="k-subtle">
            <tr>
              <th scope="col" className="py-2 pr-4 font-medium">Input</th>
              <th scope="col" className="py-2 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {guide.examples.map(([input, result]) => (
              <tr key={input}>
                <td className="py-2.5 pr-4">{input}</td>
                <td className="py-2.5 tabular">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-10 text-lg font-semibold">Do the same in your code</h3>
        <p className="mt-2 k-muted leading-relaxed">
          This tool runs on the open-source Kenat library, available for JavaScript, Python, Dart and PHP.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-[var(--code-bg)] p-4 text-sm text-[var(--code-fg)]">
          <code>{guide.code}</code>
        </pre>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {PACKAGES.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="k-link" target="_blank" rel="noopener noreferrer">{p.label}</a>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Documentation</h3>
            <ul className="mt-3 space-y-1.5">
              {guide.docs.map((d) => (
                <li key={d.href + d.label}><Link href={d.href} className="k-link">{d.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Related</h3>
            <ul className="mt-3 space-y-1.5">
              {guide.related.map((r) => (
                <li key={r.href}><Link href={r.href} className="k-link">{r.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
