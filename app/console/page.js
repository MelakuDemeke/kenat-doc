import Link from "next/link";
import { FiExternalLink, FiShield } from "react-icons/fi";
import { currentUser } from "@/lib/firebase/session.js";
import { Plans } from "@/lib/api/auth.js";
import { getDb } from "@/lib/firebase/admin.js";
import { SignIn } from "@/components/console/SignIn.jsx";
import { KeyManager } from "@/components/console/KeyManager.jsx";

// Reads a session cookie, so it can never be statically rendered.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "API Console",
  description: "Create and manage your Kenat API keys.",
};

export default async function ConsolePage() {
  const user = await currentUser();

  let plan = Plans.free;
  if (user) {
    const profile = await (await getDb()).collection("users").doc(user.uid).get();
    plan = Plans[profile.data()?.plan ?? "free"] ?? Plans.free;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">API Console</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Ethiopian calendar conversion, holidays and Bahire Hasab over HTTP.{" "}
          <Link href="/doc/api" className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1">
            Read the API docs <FiExternalLink size={12} />
          </Link>
        </p>
      </div>

      {user ? (
        <>
          {user.isAdmin && (
            <Link
              href="/console/admin"
              className="inline-flex items-center gap-2 mb-6 px-3 py-2 text-sm rounded-lg border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <FiShield size={14} /> Admin dashboard
            </Link>
          )}
          <KeyManager user={user} plan={plan} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
