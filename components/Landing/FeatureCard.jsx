export function FeatureCard({ icon, title, desc, tag }) {
  return (
    <div className="k-card h-full p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] k-accent text-lg" aria-hidden="true">
          {icon}
        </span>
        {tag && <span className="text-xs font-medium k-subtle">{tag}</span>}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
      <p className="mt-1.5 k-muted leading-relaxed">{desc}</p>
    </div>
  );
}
