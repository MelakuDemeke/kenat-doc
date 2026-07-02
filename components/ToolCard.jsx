import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function ToolCard({ icon, title, link, desc, tag }) {
  return (
    <Link href={link} className="block group focus:outline-none">
      <div className="relative flex flex-col justify-between p-6 h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-sm hover:shadow-md overflow-hidden cursor-pointer hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-sky-500/40">
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none group-hover:border-sky-500 transition-colors"></span>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-sky-600 dark:text-sky-400 border border-zinc-200 dark:border-zinc-750 transition-colors group-hover:text-purple-500 dark:group-hover:text-purple-400">
              {icon}
            </div>
            {tag && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900/30">
                {tag}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-450 leading-relaxed">{desc}</p>
        </div>

        <div className="mt-5 flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-sky-500 transition-colors">
          <span>Open tool</span>
          <FiArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
