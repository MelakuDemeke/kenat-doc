import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function ToolCard({ icon, title, link, desc, tag }) {
  return (
    <Link
      href={link}
      className="group k-card flex h-full flex-col p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_45%,var(--border))]"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] k-accent text-lg" aria-hidden="true">
          {icon}
        </span>
        <FiArrowUpRight
          className="k-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{title}</h2>
      <p className="mt-1.5 k-muted leading-relaxed">{desc}</p>
      {tag && <span className="mt-auto pt-5 text-xs font-medium k-subtle">{tag}</span>}
    </Link>
  );
}
