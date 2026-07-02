"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import {
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const ICONS = [
  {
    key: "javascript",
    label: "JavaScript",
    Icon: SiJavascript,
    iconClass: "text-amber-500",
    chipClass: "bg-amber-100/95 dark:bg-amber-500/20",
  },
  {
    key: "typescript",
    label: "TypeScript",
    Icon: SiTypescript,
    iconClass: "text-blue-600",
    chipClass: "bg-blue-100/95 dark:bg-blue-500/20",
  },
  {
    key: "python",
    label: "Python",
    Icon: SiPython,
    iconClass: "text-emerald-600",
    chipClass: "bg-emerald-100/95 dark:bg-emerald-500/20",
  },
  {
    key: "react",
    label: "React",
    Icon: SiReact,
    iconClass: "text-cyan-500",
    chipClass: "bg-cyan-100/95 dark:bg-cyan-500/20",
  },
  {
    key: "node",
    label: "Node.js",
    Icon: SiNodedotjs,
    iconClass: "text-lime-600",
    chipClass: "bg-lime-100/95 dark:bg-lime-500/20",
  },
];

export function OrbitingLanguageIcons() {
  const [positions, setPositions] = useState(() =>
    ICONS.map(() => ({ x: 0, y: 0, scale: 1 }))
  );

  const clock = useMemo(() => new THREE.Clock(), []);

  useEffect(() => {
    let frameId = 0;
    const orbitRadiusX = 290;
    const orbitRadiusY = 170;
    const orbitSpeed = 0.16;
    const noFlyZoneY = 115;

    const update = () => {
      const time = clock.getElapsedTime();
      const projected = ICONS.map((_, index) => {
        const angle = time * orbitSpeed + (index / ICONS.length) * Math.PI * 2;
        const x = Math.cos(angle) * orbitRadiusX;
        let y = Math.sin(angle) * orbitRadiusY;
        if (Math.abs(y) < noFlyZoneY) {
          y = y < 0 ? -noFlyZoneY : noFlyZoneY;
        }
        const depth = Math.sin(angle * 1.2);
        const scale = THREE.MathUtils.clamp(0.9 + depth * 0.08, 0.82, 1);
        return { x, y, scale };
      });

      setPositions(projected);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frameId);
  }, [clock]);

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {ICONS.map(({ key, Icon, iconClass, chipClass }, index) => {
        const pos = positions[index] || { x: 0, y: 0, scale: 1 };
        return (
          <div
            key={key}
            className={`absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10 opacity-85 ${chipClass}`}
            style={{
              transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
            }}
          >
            <Icon className={`text-xl ${iconClass}`} />
          </div>
        );
      })}
    </div>
  );
}
