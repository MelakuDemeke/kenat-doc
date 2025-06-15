export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg transition-all ${className}`}
    >
      {children}
    </div>
  );
}