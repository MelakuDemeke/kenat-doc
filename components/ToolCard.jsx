import Link from "next/link";

export function ToolCard({ icon, title, link }) {
  return (
    <Link href={link} passHref>
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex items-center transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
        <div className="p-4 bg-gray-100 dark:bg-zinc-700">
          <div className="text-sky-500 dark:text-sky-400">{icon}</div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Read more
          </p>
        </div>
      </div>
    </Link>
  );
}
