/** Visible byline for blog posts: named author and publish date (E-E-A-T signals). */
export function PostMeta({ date, author = "Melaku Demeke", authorUrl = "https://github.com/MelakuDemeke" }) {
  const d = new Date(`${date}T00:00:00Z`);
  const label = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  return (
    <p className="mt-3 text-sm k-subtle">
      By{" "}
      <a href={authorUrl} rel="author noopener" target="_blank" className="k-link">
        {author}
      </a>{" "}
      · <time dateTime={date}>{label}</time>
    </p>
  );
}
