import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function BlogPostCard({ href, title, description, date, image }) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link href={href} className="block group focus:outline-none">
      <div className="relative flex flex-col h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-sm hover:shadow-md overflow-hidden cursor-pointer hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-sky-500/40">
        {image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-1 p-6">
          <div>
            {formattedDate && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {formattedDate}
              </span>
            )}
            <h3 className="text-lg font-bold mt-2 mb-2 text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-450 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="mt-5 flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-sky-500 transition-colors">
            <span>Read post</span>
            <FiArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
