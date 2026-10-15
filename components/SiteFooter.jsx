"use client";
import { useState, useEffect } from "react";
import Kenat from "kenat";
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

const calendarLinks = [
  { label: "Today's Ethiopian date", href: "/today" },
  { label: "Ethiopian holidays", href: "/holidays" },
  { label: "Ethiopian calendar", href: "/calendar" },
  { label: "Enkutatash", href: "/holidays/enkutatash" },
  { label: "Fasika", href: "/holidays/fasika" },
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
  const [etYear, setEtYear] = useState(null);
  useEffect(() => { setEtYear(new Kenat().getEthiopian().year); }, []);
  const heading = "text-sm font-semibold text-[var(--fg)]";
  const link = "text-[0.95rem] text-[var(--muted)] hover:text-[var(--fg)] transition-colors";
  return (
    <footer className="w-full border-t k-border bg-[var(--surface)] text-[var(--fg)]">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="h-7 w-auto" />
              <span className="font-semibold text-xl tracking-tight">Kenat</span>
            </div>
            <p className="text-[0.95rem] k-muted leading-relaxed max-w-xs">
              Ethiopian calendar toolkit for developers. Date conversion, holidays, Bahire Hasab, and more.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/MelakuDemeke/kenat" target="_blank" rel="noopener noreferrer" aria-label="Kenat on GitHub" className="k-subtle hover:text-[var(--fg)] transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="https://t.me/kenat_bot" target="_blank" rel="noopener noreferrer" aria-label="Kenat on Telegram" className="k-subtle hover:text-[var(--fg)] transition-colors">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>

          <nav aria-label="Site" className="space-y-5 lg:col-span-2">
            <h3 className={heading}>Site</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={link}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ethiopian calendar" className="space-y-5 lg:col-span-2">
            <h3 className={heading}>Calendar</h3>
            <ul className="space-y-3">
              {calendarLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={link}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Libraries" className="space-y-5 lg:col-span-2">
            <h3 className={heading}>Libraries</h3>
            <ul className="space-y-3">
              {libraries.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1.5 font-mono text-sm group`}>
                    {label}
                    <FiExternalLink size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-5 lg:col-span-3">
            <h3 className={heading}>Get the app</h3>
            <p className="text-[0.95rem] k-muted leading-relaxed max-w-[16rem]">
              The full Kenat experience on Android — date conversion, holidays, cloud sync, and more.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex transition-transform hover:-translate-y-px"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Google_Play_Store_badge_EN.svg" alt="Get the Kenat app on Google Play" className="h-11 w-auto" />
            </a>
          </div>
        </div>

        <div className="mt-16 border-t k-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm k-subtle">
          <p>
            © {year} GC{etYear ? ` / ${etYear} EC` : ""} · Kenat by{" "}
            <a href="https://github.com/MelakuDemeke" target="_blank" rel="noopener noreferrer" className="k-muted hover:text-[var(--fg)] transition-colors">
              @MelakuDemeke
            </a>
            . MIT License.
          </p>
          <Link href="/privacy" className="hover:text-[var(--fg)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
