import { GlassCard } from "./GlassCard";

export function FeatureCard({ icon, title, desc }) {
  return (
    <GlassCard className="p-6 text-left transform hover:-translate-y-2 transition-transform duration-300">
      <div className="text-sky-500 dark:text-sky-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">{desc}</p>
    </GlassCard>
  );
}
