import Link from "next/link";
import { toEC, monthNames } from "kenat";

function ethiopianDate(date) {
  try {
    const d = new Date(date);
    const et = toEC(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    return `${monthNames.amharic[et.month - 1]} ${et.day}, ${et.year}`;
  } catch {
    return null;
  }
}

/** A blog post card, dated in both calendars. */
export function BlogPostCard({ href, title, description, date, image }) {
  const gregorian = date
    ? new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    : null;
  const ethiopian = date ? ethiopianDate(date) : null;

  return (
    <Link href={href} className="group k-card flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
      {image && (
        <div className="aspect-[16/9] overflow-hidden bg-[var(--surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2 text-sm k-subtle">
          {gregorian && <time dateTime={date}>{gregorian}</time>}
          {ethiopian && (
            <>
              <span aria-hidden="true">·</span>
              <span className="k-am font-normal" lang="am">{ethiopian}</span>
            </>
          )}
        </div>
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] leading-snug text-balance group-hover:text-[var(--accent)] transition-colors">
          {title}
        </h2>
        {description && <p className="mt-2 k-muted leading-relaxed line-clamp-3">{description}</p>}
        <span className="mt-auto pt-5 text-sm font-medium k-accent">Read post →</span>
      </div>
    </Link>
  );
}
