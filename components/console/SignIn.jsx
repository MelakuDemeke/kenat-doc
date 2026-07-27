"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { auth, googleProvider, githubProvider } from "@/lib/firebase/client.js";

/**
 * The Ethiopian year is thirteen months: twelve of thirty days, then Pagume, which
 * is five days long (six in a leap year). Rendering the whole year as thirteen cells
 * with today's month filled says what the product is faster than a paragraph would.
 */
function MonthStrip({ month }) {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => {
        const isCurrent = i + 1 === month;
        const isPagume = i === 12;
        return (
          <span
            key={i}
            className={[
              "rounded-[2px] transition-colors",
              // Pagume is a stub of a month, so it is drawn as a stub of a bar.
              isPagume ? "w-1.5" : "w-2.5",
              isCurrent ? "h-5 bg-sky-500" : "h-3 bg-zinc-300 dark:bg-zinc-700",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

function ProviderButton({ icon, label, onClick, busy, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-sky-500/60 hover:bg-white dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition-colors disabled:opacity-50 disabled:cursor-wait cursor-pointer"
    >
      <span className="text-zinc-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
        {icon}
      </span>
      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
        {busy ? "Opening…" : label}
      </span>
    </button>
  );
}

export function SignIn({ today }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);

  async function signIn(provider, label) {
    setBusy(label);
    setError(null);
    try {
      const credential = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(credential.user, true);

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Sign-in did not complete.");

      // The session lives in a cookie the server reads, so re-render from the server.
      router.refresh();
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return setBusy(null);
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("That email is already registered with the other provider. Use that one instead.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("That provider is not enabled yet. Try the other one.");
      } else {
        setError(err.message ?? "Sign-in did not complete.");
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl overflow-hidden">
        {/* Identity: the product demonstrating itself. */}
        <div className="px-7 pt-7 pb-6 bg-gradient-to-b from-sky-50/60 to-transparent dark:from-sky-950/20">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-5">
            Kenat API
          </p>

          {today ? (
            <>
              <div className="flex items-baseline gap-3">
                <span
                  className="text-6xl leading-none font-semibold text-zinc-900 dark:text-white"
                  lang="am"
                >
                  {today.dayGeez}
                </span>
                <span className="text-lg text-zinc-700 dark:text-zinc-300" lang="am">
                  {today.monthAmharic}
                </span>
              </div>
              <p className="mt-2 text-xs font-mono text-zinc-500 tabular-nums">
                {today.ethiopianIso} EC · {today.gregorianLabel}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <MonthStrip month={today.month} />
                <span className="text-[11px] text-zinc-500">
                  month {today.month} of 13
                </span>
              </div>
            </>
          ) : (
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              Ethiopian calendar, over HTTP.
            </p>
          )}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 px-7 py-6">
          <h1 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
            Sign in to get an API key
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">
            Conversion, holidays and Bahire Hasab for any language.
          </p>

          <div className="space-y-2.5">
            <ProviderButton
              icon={<FaGithub size={18} />}
              label="Continue with GitHub"
              onClick={() => signIn(githubProvider, "github")}
              busy={busy === "github"}
              disabled={Boolean(busy)}
            />
            <ProviderButton
              icon={<FaGoogle size={16} />}
              label="Continue with Google"
              onClick={() => signIn(googleProvider, "google")}
              busy={busy === "google"}
              disabled={Boolean(busy)}
            />
          </div>

          {error && (
            <p
              className="mt-4 text-sm text-red-600 dark:text-red-400 border-l-2 border-red-400 pl-3"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 px-7 py-3.5 bg-zinc-50/60 dark:bg-zinc-950/40">
          <p className="text-[11px] text-zinc-500">
            Free tier: 1,000 requests a month, no card. The{" "}
            <a
              href="/doc/installation"
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              library
            </a>{" "}
            stays free and MIT-licensed.
          </p>
        </div>
      </div>
    </div>
  );
}
