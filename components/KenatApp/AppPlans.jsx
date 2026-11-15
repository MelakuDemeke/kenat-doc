import { clsx } from "clsx";
import { FiCheck } from "react-icons/fi";

export const APP_PRICING_PLANS = [
  {
    id: "free",
    name: "Basic",
    term: "Free forever",
    price: "0",
    currency: "ETB",
    stars: null,
    note: "Conversion, holidays, Bahire Hasab, calendar sync, reminders and widgets. Shows ads.",
  },
  {
    id: "3m",
    name: "Standard",
    term: "3 months",
    price: "199",
    currency: "ETB",
    stars: 80,
    note: "Every Pro feature.",
  },
  {
    id: "6m",
    name: "Balanced",
    term: "6 months",
    price: "399",
    currency: "ETB",
    stars: 160,
    note: "Covers a full season of fasts and feasts.",
  },
  {
    id: "1y",
    name: "Ultimate",
    term: "1 year",
    price: "499",
    currency: "ETB",
    stars: 200,
    note: "The complete experience, at the lowest monthly price.",
    recommended: true,
  },
];

export function AppPlans() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {APP_PRICING_PLANS.map((p) => (
        <li
          key={p.id}
          className={clsx(
            "k-card relative flex flex-col p-6",
            // outline, not ring: .k-card's own box-shadow would hide a ring
            p.recommended && "outline-2 -outline-offset-1 outline-sky-500 dark:outline-sky-400"
          )}
        >
          {p.recommended && (
            <span className="absolute -top-3 left-6 rounded-full bg-sky-500 px-2.5 py-0.5 text-xs font-semibold text-white dark:bg-sky-400 dark:text-zinc-950">
              Best value
            </span>
          )}
          <h3 className="text-lg font-semibold tracking-[-0.01em]">{p.name}</h3>
          <p className="text-sm k-subtle">{p.term}</p>
          <p className="mt-5 flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold tracking-[-0.04em] tabular-nums">{p.price}</span>
            <span className="text-sm font-medium k-muted">{p.currency}</span>
          </p>
          <p className="mt-1 text-sm k-muted tabular-nums">
            {p.stars ? `or ${p.stars} Telegram Stars` : "No payment needed"}
          </p>
          <p className="mt-5 flex gap-2 text-[0.95rem] leading-relaxed k-muted">
            <FiCheck aria-hidden="true" className="mt-1 shrink-0 k-accent" />
            {p.note}
          </p>
        </li>
      ))}
    </ul>
  );
}
