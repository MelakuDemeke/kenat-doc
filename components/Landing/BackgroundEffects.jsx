"use client";

import { useEffect } from "react";

export function BackgroundEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;
    let currentX = mouseX,
      currentY = mouseY;
    let animationFrameId;

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.03;
      currentY += (mouseY - currentY) * 0.03;
      root.style.setProperty("--mouse-x", `${currentX}px`);
      root.style.setProperty("--mouse-y", `${currentY}px`);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="blob"
        style={{
          "--multiplier-x": "0.5",
          "--multiplier-y": "0.7",
          width: "600px",
          height: "600px",
          top: "-20%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0) 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          "--multiplier-x": "-0.8",
          "--multiplier-y": "-0.5",
          width: "500px",
          height: "500px",
          bottom: "-15%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 70%)",
        }}
      />
      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(72px);
          transform: translate(
            calc(var(--mouse-x, 50vw) * var(--multiplier-x, 0)),
            calc(var(--mouse-y, 50vh) * var(--multiplier-y, 0))
          );
          animation: breathing 12s ease-in-out infinite alternate;
          transition: transform 0.2s ease-out;
        }
        .blob:nth-child(2) {
          animation-delay: -6s;
        }
        @keyframes breathing {
          0% {
            transform: scale(0.9) rotate(-10deg);
          }
          100% {
            transform: scale(1.1) rotate(10deg);
          }
        }
      `}</style>
    </div>
  );
}
