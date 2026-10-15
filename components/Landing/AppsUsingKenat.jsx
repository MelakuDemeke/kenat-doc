import { FiArrowUpRight, FiPlus } from "react-icons/fi";

/* Apps on Google Play that run on the Kenat engine. Icons come from each Play Store listing. */
const APPS = [
  {
    name: "Kenat",
    desc: "Ethiopian calendar & holidays",
    icon: "/apps/kenat.webp",
    url: "https://play.google.com/store/apps/details?id=me.melaku.kenat",
  },
  {
    name: "Odit",
    desc: "Money tracker from CBE & telebirr SMS",
    icon: "/apps/odit.webp",
    url: "https://play.google.com/store/apps/details?id=com.robi.odit",
  },
  {
    name: "Totals",
    desc: "Private spending records from bank SMS",
    icon: "/apps/totals.webp",
    url: "https://play.google.com/store/apps/details?id=detached.totals",
  },
];

/* Play Store install referrer, so each developer sees kenat.et as the source in Play Console. */
const REFERRER = encodeURIComponent("utm_source=kenat.et&utm_medium=referral&utm_campaign=apps_built_with_kenat");
const withReferrer = (url) => `${url}&referrer=${REFERRER}`;

const SUBMIT_URL = "https://github.com/MelakuDemeke/kenat/issues/new?title=Showcase%3A%20";

export function AppsUsingKenat() {
  return (
    <section aria-labelledby="apps-using-kenat" className="border-t k-border">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="apps-using-kenat" className="text-sm font-medium k-muted">
            Apps built with Kenat
          </h2>
          <a
            href={SUBMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm k-subtle hover:text-[var(--fg)] transition-colors"
          >
            <FiPlus aria-hidden="true" /> Built something with Kenat? Add yours
          </a>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <li key={app.name} className="min-w-0">
              <a
                href={withReferrer(app.url)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${app.name} on Google Play`}
                className="group flex items-center gap-4 rounded-2xl border k-border bg-[var(--bg)] p-3.5 pr-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-500/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.icon}
                  alt=""
                  width={52}
                  height={52}
                  loading="lazy"
                  className="h-13 w-13 shrink-0 rounded-[14px] ring-1 ring-black/5 dark:ring-white/10"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold tracking-[-0.01em]">{app.name}</span>
                  <span className="block text-sm leading-snug k-subtle line-clamp-2">{app.desc}</span>
                </span>
                <FiArrowUpRight
                  className="shrink-0 k-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
