import {
  FiArrowRight,
  FiBell,
  FiCalendar,
  FiCheckSquare,
  FiChevronDown,
  FiCloud,
  FiCommand,
  FiGift,
  FiHash,
  FiHeadphones,
  FiLayers,
  FiMonitor,
  FiRepeat,
  FiShield,
  FiSun,
  FiWatch,
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";

import { SiteFooter } from "@/components/SiteFooter";
import { HeroBackdrop } from "@/components/Landing/HeroBackdrop";
import { PhoneFrame, WindowFrame } from "@/components/KenatApp/DeviceFrames";
import { DesktopTour } from "@/components/KenatApp/DesktopTour";
import { AppPlans } from "@/components/KenatApp/AppPlans";
import { StoreButtons } from "@/components/KenatApp/StoreButtons";

const PHONE_SCREENS = [
  { key: "calendar", label: "Calendar", alt: "Kenat month view on Android with Ethiopian and Gregorian dates in each cell and events" },
  { key: "bahire-hasab", label: "Bahire Hasab", alt: "Kenat Bahire Hasab screen showing the year's derivation from Amete Alem to Metqi" },
  { key: "convert", label: "Convert", alt: "Kenat date converter showing Tikimt 27, 2019 and November 6, 2026" },
  { key: "holidays", label: "Holidays", alt: "Kenat holidays list with Enkutatash, Meskel and Genna and their artwork" },
  { key: "settings", label: "Settings", alt: "Kenat settings with a live preview of the calendar" },
  { key: "widgets", label: "Home screen", alt: "Android home screen with Kenat photo, analog clock, month, countdown and progress widgets" },
];

const FEATURES = [
  {
    Icon: FiRepeat,
    title: "Date conversion",
    desc: "Ethiopian to Gregorian and back, Pagume and leap years included, with the weekday and the holidays around any date.",
  },
  {
    Icon: FiGift,
    title: "Holidays and fasts",
    desc: "Public, Orthodox, Muslim and cultural holidays and every fasting period, each holiday with its own artwork.",
  },
  {
    Icon: FiSun,
    title: "Bahire Hasab",
    desc: "The movable feasts of any year, with the reckoning shown step by step. Free for everyone.",
  },
  {
    Icon: FiCheckSquare,
    title: "Events and tasks",
    desc: "Repeats that think in the Ethiopian calendar: every Meskerem 1, the 12th of each month, every Sunday.",
  },
  {
    Icon: FiWatch,
    title: "Widgets and watch faces",
    desc: "Home-screen widgets for the date, month, agenda, countdown, progress and an analog clock with Ge'ez numerals.",
  },
  {
    Icon: FiBell,
    title: "Reminders",
    desc: "Notifications for your events, tasks and holidays, and the Ethiopian date in the status bar all day.",
  },
  {
    Icon: FiHash,
    title: "Ge'ez numerals and Ethiopian time",
    desc: "Show numbers in Ge'ez and the time the Ethiopian way, with the day starting at dawn.",
  },
  {
    Icon: FiCalendar,
    title: "Your phone's calendar",
    desc: "Events from Google or your phone's calendar appear beside the Ethiopian dates, in their own colours.",
  },
];

const DESKTOP_EXTRAS = [
  {
    Icon: FiMonitor,
    title: "Today's date in the tray",
    desc: "The tray icon is the Ethiopian day and month, so the date is one glance away all day.",
  },
  {
    Icon: FiLayers,
    title: "Widgets on the desktop",
    desc: "Floating Today, month, clock and countdown widgets, plus Today, Agenda and Countdown on the Windows 11 Widgets Board.",
  },
  {
    Icon: FiCommand,
    title: "Built for the keyboard",
    desc: "Arrows move the day, PgUp and PgDn change month, T jumps to today, Ctrl+N adds an event and Ctrl+F searches.",
  },
  {
    Icon: FiCloud,
    title: "Same account as your phone",
    desc: "Sign in with Google and your Kenat events and tasks come with you. Pro carries over too.",
  },
];

const PRO_BENEFITS = [
  { Icon: FiShield, title: "No ads", desc: "Nothing between you and your calendar." },
  { Icon: FiCloud, title: "Cross-device cloud sync", desc: "Your events and preferences on every device you sign in to." },
  { Icon: FaTelegram, title: "Telegram integration", desc: "Manage your schedule from the Kenat bot, @kenat_bot." },
  { Icon: FiLayers, title: "Premium customization", desc: "Exclusive accent colours and themes to match your style." },
  { Icon: FiHeadphones, title: "Priority support", desc: "Your questions and feature requests go to the front of the line." },
];

const FAQ = [
  {
    q: "Is Kenat available for Windows?",
    a: "Yes. Kenat for Windows is in the Microsoft Store for Windows 10 and 11. It has the same calendar, holidays, Bahire Hasab, converter, events and tasks as the phone app, plus the tray date, desktop widgets and keyboard shortcuts.",
  },
  {
    q: "Does Kenat Pro work on Windows?",
    a: "Yes. Sign in to the Windows app with the same Google account you use on your phone and Pro comes with it. There is nothing to buy again on the PC.",
  },
  {
    q: "Will my events show on both my phone and my PC?",
    a: "Sign in with the same account on both and your Kenat events and tasks stay in step. The events from your phone's own calendar show on the PC too, read-only.",
  },
  {
    q: "What makes Kenat the best Ethiopian calendar app?",
    a: "Kenat combines accurate two-way Ethiopian–Gregorian conversion, a full holiday database, Bahire Hasab and native calendar integration in one app built for daily use.",
  },
  {
    q: "Can I pay with Telegram Stars?",
    a: "Yes. Kenat Pro is 80 Stars (3 months), 160 Stars (6 months) or 200 Stars (1 year), or you can pay the listed ETB amounts. Checkout happens in Telegram; Star pricing in your currency follows Telegram's rates.",
  },
  {
    q: "Does Kenat work offline?",
    a: "Conversion, holidays and Bahire Hasab all work on your device. Cloud sync and Telegram features need an internet connection.",
  },
];

const WRAP = "mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12";

function SectionHead({ title, children }) {
  return (
    <header className="max-w-2xl">
      <h2 className="text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.08] text-balance">{title}</h2>
      {children && <p className="mt-4 text-lg k-muted leading-relaxed text-pretty">{children}</p>}
    </header>
  );
}

function IconTile({ Icon }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] k-accent text-lg" aria-hidden="true">
      <Icon />
    </span>
  );
}

export function KenatAppLanding() {
  return (
    <div className="k-page relative min-h-screen overflow-x-clip">
      <HeroBackdrop />

      {/* ---------- Hero ---------- */}
      <section className={`relative ${WRAP} pt-12 pb-16 lg:pt-20 lg:pb-24`}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-5 flex flex-col gap-8 min-w-0">
            <h1 className="text-[2.6rem] sm:text-6xl xl:text-[4.25rem] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
              The Ethiopian calendar,{" "}
              <span className="text-sky-600 dark:text-sky-400">on your phone and your desk.</span>
            </h1>
            <p className="max-w-[34rem] text-lg sm:text-xl k-muted leading-relaxed text-pretty">
              Kenat shows every day in both calendars, with holidays, fasts, Bahire Hasab, your events and tasks. On
              Android, and now on Windows.
            </p>
            <div className="flex flex-col gap-4">
              <StoreButtons size="lg" />
              <p className="text-sm k-subtle">Free to download · Android and Windows 10 and 11</p>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="relative isolate pb-[12%] pr-[9%] sm:pr-[11%]">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/25 blur-[90px] dark:bg-sky-500/15" />
              <WindowFrame
                src="/app/desktop/calendar.webp"
                alt="Kenat for Windows: the month of Hidar with Gregorian dates in each cell, events, fasting bands and the day panel"
                eager
              />
              <PhoneFrame
                src="/app/phone/calendar.webp"
                alt="Kenat on Android: the month of Tikimt with events in each day"
                eager
                className="absolute bottom-0 right-0 w-[27%] min-w-[96px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Phone ---------- */}
      <section id="android" className="scroll-mt-24 border-t k-border">
        <div className={`${WRAP} py-20 lg:py-28`}>
          <SectionHead title="In your pocket">
            The Android app keeps both calendars on one screen, puts the date on your home screen and in the status bar,
            and reminds you before every fast and feast.
          </SectionHead>
          <ul className="mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {PHONE_SCREENS.map((s) => (
              <li key={s.key} className="w-[62%] max-w-[15rem] shrink-0 snap-center sm:w-[40%] lg:w-auto lg:max-w-none">
                <PhoneFrame src={`/app/phone/${s.key}.webp`} alt={s.alt} />
                <p className="mt-3 text-center text-sm font-medium k-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Desktop ---------- */}
      <section id="windows" className="scroll-mt-24 border-t k-border bg-[var(--surface)]">
        <div className={`${WRAP} py-20 lg:py-28`}>
          <SectionHead title="At your desk">
            Kenat for Windows is the same calendar laid out for a wide screen: a sidebar, the month in the middle and
            your day on the right. It waits in the tray until you need it.
          </SectionHead>
          <div className="mt-12">
            <DesktopTour />
          </div>
          <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {DESKTOP_EXTRAS.map(({ Icon, title, desc }) => (
              <li key={title} className="flex flex-col gap-4">
                <IconTile Icon={Icon} />
                <div>
                  <h3 className="font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="mt-1.5 k-muted leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <StoreButtons />
            <p className="text-sm k-subtle">Windows 10 (1809) and later · Widgets Board on Windows 11</p>
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section id="features" className="scroll-mt-24 border-t k-border">
        <div className={`${WRAP} py-20 lg:py-28`}>
          <SectionHead title="Built on the Ethiopian calendar">
            Not a skin on a Gregorian app. Months, weeks, repeats and movable feasts are computed natively by the open
            source <a href="/doc" className="k-link">Kenat engine</a>.
          </SectionHead>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <li
                key={title}
                className="k-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-500/40"
              >
                <IconTile Icon={Icon} />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-1.5 k-muted leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Pro ---------- */}
      <section id="pro" className="scroll-mt-24 border-t k-border bg-[var(--surface)]">
        <div className={`${WRAP} py-20 lg:py-28`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHead title="Kenat Pro">
                The calendar, holidays and Bahire Hasab are free. Pro removes ads and adds sync, Telegram and more. One
                subscription covers your phone and your PC.
              </SectionHead>
              <ul className="mt-10 space-y-5">
                {PRO_BENEFITS.map(({ Icon, title, desc }) => (
                  <li key={title} className="flex gap-4">
                    <IconTile Icon={Icon} />
                    <div>
                      <h3 className="font-semibold tracking-[-0.01em]">{title}</h3>
                      <p className="mt-0.5 k-muted leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 lg:pt-3">
              <AppPlans />
              <p className="mt-6 text-sm k-subtle leading-relaxed">
                Subscribe in the app. Pay in ETB, or with Telegram Stars at checkout in Telegram.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-24 border-t k-border">
        <div className={`${WRAP} py-20 lg:py-28 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-4">
            <SectionHead title="Questions" />
          </div>
          <div className="lg:col-span-8 k-card divide-y divide-[var(--border)] overflow-hidden">
            {FAQ.map((item, i) => (
              <details key={item.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 sm:px-6 py-5 font-semibold tracking-[-0.01em] transition-colors hover:bg-[var(--surface)] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <FiChevronDown aria-hidden="true" className="shrink-0 k-subtle transition-transform duration-200 group-open:rotate-180 group-open:text-[var(--accent)]" />
                </summary>
                <p className="px-5 sm:px-6 pb-5 -mt-1 k-muted leading-relaxed max-w-[65ch]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 lg:pb-28">
        <div className="mx-auto w-full max-w-[88rem] rounded-3xl bg-zinc-900 dark:ring-1 dark:ring-zinc-800 text-white px-7 sm:px-12 py-14 lg:py-16 grid grid-cols-1 gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-[2.2rem] sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance">
              Never convert a date in your head again.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-zinc-300 leading-relaxed">
              Get Kenat on your phone and your PC. Building something of your own? The engine behind it is open source.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5 lg:items-end">
            <StoreButtons size="lg" className="lg:justify-end" />
            <a href="/doc" className="inline-flex items-center gap-2 font-medium text-sky-400 hover:text-white transition-colors">
              Kenat for developers <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
