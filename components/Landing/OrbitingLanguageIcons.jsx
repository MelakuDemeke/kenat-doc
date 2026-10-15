import { SiJavascript, SiNodedotjs, SiPython, SiReact, SiTypescript, SiFlutter, SiPhp } from "react-icons/si";

const ICONS = [
  { key: "javascript", label: "JavaScript", Icon: SiJavascript, iconClass: "text-amber-500", pos: { top: "-1.1rem", left: "-3.5rem" }, dur: "4.2s", delay: "0s" },
  { key: "flutter", label: "Flutter", Icon: SiFlutter, iconClass: "text-sky-500", pos: { top: "-1.3rem", right: "1.5rem" }, dur: "5.1s", delay: "-1.3s" },
  { key: "typescript", label: "TypeScript", Icon: SiTypescript, iconClass: "text-blue-600 dark:text-blue-400", pos: { top: "24%" }, cls: "-right-6 xl:-right-[4.5rem]", dur: "3.9s", delay: "-2.5s" },
  { key: "python", label: "Python", Icon: SiPython, iconClass: "text-emerald-600 dark:text-emerald-400", pos: { top: "46%" }, cls: "-left-6 xl:-left-20", dur: "4.8s", delay: "-0.7s" },
  { key: "react", label: "React", Icon: SiReact, iconClass: "text-cyan-500", pos: {}, cls: "-right-5 bottom-[1.6rem] xl:-right-16 xl:bottom-[22%]", dur: "5.5s", delay: "-3.1s" },
  { key: "php", label: "PHP", Icon: SiPhp, iconClass: "text-indigo-500 dark:text-indigo-400", pos: { bottom: "12%" }, cls: "-left-5 xl:-left-[3.25rem]", dur: "4.4s", delay: "-1.8s" },
  { key: "node", label: "Node.js", Icon: SiNodedotjs, iconClass: "text-lime-600 dark:text-lime-400", pos: { bottom: "-1.2rem", right: "35%" }, dur: "5.0s", delay: "-2.1s" },
];

/** Language chips that drift gently around the Today card (md and up). */
export function OrbitingLanguageIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden="true">
      {ICONS.map(({ key, Icon, iconClass, label, pos, cls = "", dur, delay }) => (
        <div
          key={key}
          className={`lang-float absolute ${cls} flex items-center gap-1.5 rounded-full border k-border bg-[var(--bg)] px-3 py-1.5 shadow-[0_6px_20px_-8px_rgb(0_0_0_/_0.25)] dark:bg-[var(--surface)]`}
          style={{ ...pos, "--float-dur": dur, "--float-delay": delay }}
        >
          <Icon className={`shrink-0 text-[15px] ${iconClass}`} />
          <span className="text-xs font-medium k-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
