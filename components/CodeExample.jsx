"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

/**
 * A code block for examples that must embed the site's own origin.
 *
 * Fenced MDX code blocks are literal text and cannot interpolate values, so any
 * example containing the base URL would have to hardcode a host — exactly what
 * `lib/site.js` exists to prevent. This takes the string as a child expression
 * instead, at the cost of syntax highlighting.
 */
export function CodeExample({ children, lang }) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === "string" ? children.trim() : String(children ?? "").trim();

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group my-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden">
      {lang && (
        <span className="absolute top-2 right-11 text-[10px] font-mono uppercase tracking-wider text-zinc-400 select-none">
          {lang}
        </span>
      )}
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-1.5 right-1.5 p-1.5 rounded-md text-zinc-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
      >
        {copied ? <FiCheck size={14} className="text-green-600" /> : <FiCopy size={14} />}
      </button>
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed">
        <code className="font-mono text-zinc-800 dark:text-zinc-200">{code}</code>
      </pre>
    </div>
  );
}
