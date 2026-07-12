import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=me.melaku.kenat";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Documentation", href: "/doc" },
  { label: "Tools", href: "/tools" },
  { label: "App", href: "/app" },
  { label: "Privacy Policy", href: "/privacy" },
];

const libraries = [
  { label: "kenat", href: "https://github.com/MelakuDemeke/kenat" },
  { label: "kenat-ui", href: "https://github.com/MelakuDemeke/kenat-ui" },
  { label: "kenat_py", href: "https://github.com/MelakuDemeke/kenat_py" },
  { label: "kenat-cli", href: "https://github.com/MelakuDemeke/kenat-cli" },
  { label: "kenat-dart", href: "https://github.com/MelakuDemeke/kenat-dart" },
  { label: "kenat-php", href: "https://github.com/MelakuDemeke/kenat-php" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 bg-grid-dots">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Kenat" className="h-7 w-auto" />
              <span className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">
                Kenat
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[220px]">
              Ethiopian calendar toolkit for developers. Date conversion,
              holidays, Bahire Hasab, and more.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/MelakuDemeke/kenat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://t.me/kenat_bot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-zinc-400 hover:text-sky-500 transition-colors"
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Libraries */}
          <div className="space-y-5">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              Libraries
            </h3>
            <ul className="space-y-3">
              {libraries.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                  >
                    {label}
                    <FiExternalLink
                      size={11}
                      className="opacity-0 group-hover:opacity-50 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App */}
          <div className="space-y-5">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              Get the App
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
              The full Kenat experience on Android — date conversion, holidays,
              cloud sync, and more.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Kenat on Google Play"
              className="inline-flex transition-transform hover:scale-[1.02] active:scale-95"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {year} Kenat by{" "}
            <a
              href="https://github.com/MelakuDemeke"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              @MelakuDemeke
            </a>
            . MIT License.
          </p>
          <Link
            href="/privacy"
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
