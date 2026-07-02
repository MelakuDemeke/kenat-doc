"use client";

import { SiJavascript, SiNodedotjs, SiPython, SiReact, SiTypescript, SiFlutter } from "react-icons/si";

const ICONS = [
  {
    key: "javascript",
    label: "JavaScript",
    Icon: SiJavascript,
    iconClass: "text-amber-500",
    chipClass: "bg-amber-50/90 dark:bg-amber-500/10 border-amber-200/70 dark:border-amber-500/20 text-zinc-700 dark:text-zinc-300",
  },
  {
    key: "typescript",
    label: "TypeScript",
    Icon: SiTypescript,
    iconClass: "text-blue-600",
    chipClass: "bg-blue-50/90 dark:bg-blue-500/10 border-blue-200/70 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-300",
  },
  {
    key: "python",
    label: "Python",
    Icon: SiPython,
    iconClass: "text-emerald-600",
    chipClass: "bg-emerald-50/90 dark:bg-emerald-500/10 border-emerald-200/70 dark:border-emerald-500/20 text-zinc-700 dark:text-zinc-300",
  },
  {
    key: "react",
    label: "React",
    Icon: SiReact,
    iconClass: "text-cyan-500",
    chipClass: "bg-cyan-50/90 dark:bg-cyan-500/10 border-cyan-200/70 dark:border-cyan-500/20 text-zinc-700 dark:text-zinc-300",
  },
  {
    key: "node",
    label: "Node.js",
    Icon: SiNodedotjs,
    iconClass: "text-lime-600",
    chipClass: "bg-lime-50/90 dark:bg-lime-500/10 border-lime-200/70 dark:border-lime-500/20 text-zinc-700 dark:text-zinc-300",
  },
  {
    key: "flutter",
    label: "Flutter",
    Icon: SiFlutter,
    iconClass: "text-sky-400",
    chipClass: "bg-sky-50/90 dark:bg-sky-500/10 border-sky-200/70 dark:border-sky-500/20 text-zinc-700 dark:text-zinc-300",
  },
];

const PLACEMENTS = [
  { top: "10%", left: "1.5%" },
  { top: "32%", right: "1.5%" },
  { top: "56%", left: "0.8%" },
  { bottom: "24%", right: "1%" },
  { bottom: "10%", left: "2%" },
  { top: "6%", right: "2%" },
];

const FLOAT_PARAMS = [
  { dur: "4.2s", delay: "0s" },
  { dur: "5.1s", delay: "-1.3s" },
  { dur: "3.9s", delay: "-2.5s" },
  { dur: "4.8s", delay: "-0.7s" },
  { dur: "5.5s", delay: "-3.1s" },
  { dur: "4.4s", delay: "-1.8s" },
];

export function OrbitingLanguageIcons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden"
      aria-hidden="true"
    >
      {ICONS.map(({ key, Icon, iconClass, chipClass, label }, i) => (
        <div
          key={key}
          className={`absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border backdrop-blur-sm lang-float ${chipClass}`}
          style={{
            ...PLACEMENTS[i],
            "--float-dur": FLOAT_PARAMS[i].dur,
            "--float-delay": FLOAT_PARAMS[i].delay,
          }}
        >
          <Icon className={`text-base shrink-0 ${iconClass}`} />
          <span className="font-mono text-[11px] font-medium opacity-75">{label}</span>
        </div>
      ))}
    </div>
  );
}
