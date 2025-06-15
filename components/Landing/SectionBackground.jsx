"use client";

import { useState, useEffect } from "react";

// The component now accepts a `rotation` prop.
// We set a default value of 0 so it doesn't break if you don't pass one.
export function SectionBackground({ rotation = 0 }) {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const newY = Math.sin(elapsedTime / 3000) * 10;
      setTranslateY(newY);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="
          relative w-full max-w-4xl h-48
          bg-gradient-to-r from-purple-500/10 to-sky-500/10
          dark:from-purple-500/5 dark:to-sky-500/5
          rounded-full
        "
        // The hardcoded degree is now replaced with the dynamic `rotation` prop
        style={{ transform: `translateY(${translateY}px) rotate(${rotation}deg)` }}
      />
    </div>
  );
}