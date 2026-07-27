import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { currentUser } from "@/lib/firebase/session.js";
import { AdminPanel } from "@/components/console/AdminPanel.jsx";
import { UpgradeQueue } from "@/components/console/UpgradeQueue.jsx";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await currentUser();

  // notFound() rather than a redirect or an error: a non-admin gets no signal that
  // this route exists at all. The API routes enforce this again server-side, so
  // hiding the page is defence in depth, not the only check.
  if (!user?.isAdmin) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link
        href="/console"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors mb-6"
      >
        <FiArrowLeft size={14} /> Back to console
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Admin</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Users, usage and manual billing. Signed in as {user.email}.
        </p>
      </div>

      {/* Payments first: it is the only part of this page with work waiting on it. */}
      <div className="space-y-10">
        <UpgradeQueue />
        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">Accounts</h2>
          <AdminPanel />
        </section>
      </div>
    </div>
  );
}
