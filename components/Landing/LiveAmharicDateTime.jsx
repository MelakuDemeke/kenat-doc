"use client";

import { useState, useEffect } from "react";
import Kenat from "kenat";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useHasMounted } from "@/hooks/useHasMounted";

export function LiveAmharicDateTime() {
  const hasMounted = useHasMounted();
  const [now, setNow] = useState(() => new Kenat());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Kenat()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return <div className="mt-8 h-[28px]" />;

  return (
    <div className="flex items-center justify-center gap-6 text-zinc-600 dark:text-zinc-300 font-mono text-sm mt-8">
      <div className="flex items-center gap-2">
        <FiCalendar className="text-sky-500 dark:text-sky-400" />
        {now.format({ lang: "amharic", showWeekday: true, useGeez: false })}
      </div>
      <div className="flex items-center gap-2">
        <FiClock className="text-sky-500 dark:text-sky-400" />
        {now
          .format({ includeTime: true, lang: "amharic" })
          .split(" ")
          .slice(3)
          .join(" ")}
      </div>
    </div>
  );
}