"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { auth, googleProvider, githubProvider } from "@/lib/firebase/client.js";

/**
 * Signs in through Firebase, then trades the ID token for an httpOnly session
 * cookie so the server can render the console without a client round trip.
 */
export function SignIn() {
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
      if (!res.ok) throw new Error((await res.json()).error ?? "Sign-in failed.");

      // The session lives in a cookie the server reads, so re-render from the server.
      router.refresh();
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return setBusy(null);
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("That email is already registered with the other provider. Sign in with it instead.");
      } else {
        setError(err.message ?? "Sign-in failed.");
      }
    } finally {
      setBusy(null);
    }
  }

  const button =
    "flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-wait cursor-pointer";

  return (
    <div className="max-w-sm mx-auto p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl shadow-lg">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Sign in</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
        Create and manage your Kenat API keys.
      </p>

      <div className="space-y-3">
        <button onClick={() => signIn(githubProvider, "github")} disabled={busy} className={button}>
          <FaGithub size={18} /> {busy === "github" ? "Signing in…" : "Continue with GitHub"}
        </button>
        <button onClick={() => signIn(googleProvider, "google")} disabled={busy} className={button}>
          <FaGoogle size={16} /> {busy === "google" ? "Signing in…" : "Continue with Google"}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
