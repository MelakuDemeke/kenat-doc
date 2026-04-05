"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/** Themes aligned with Kenat mini-app pricing (semi-transparent glass). */
export const APP_PRICING_PLANS = [
  {
    id: "free",
    name: "Basic",
    tag: "Free",
    price: "0",
    period: "Forever",
    priceEtb: 0,
    starsPrice: null,
    recommended: false,
    note: "Ad-supported; conversion, Bahire Hasab, local calendar sync & reminders.",
    theme: "from-zinc-200/80 via-zinc-400/70 to-zinc-500/80",
    text: "text-zinc-950",
    bgBlur: "bg-zinc-400/10",
    borderColor: "border-zinc-300/40",
  },
  {
    id: "3m",
    name: "Standard",
    tag: "3 months",
    price: "199",
    period: "ETB",
    priceEtb: 199,
    starsPrice: 80,
    recommended: false,
    note: "All Pro features.",
    theme: "from-slate-200/80 via-slate-400/70 to-slate-500/80",
    text: "text-slate-950",
    bgBlur: "bg-slate-400/10",
    borderColor: "border-slate-300/40",
  },
  {
    id: "6m",
    name: "Balanced",
    tag: "6 months",
    price: "399",
    period: "ETB",
    priceEtb: 399,
    starsPrice: 160,
    recommended: false,
    note: "Best for season planning.",
    theme: "from-orange-200/80 via-orange-400/70 to-orange-500/80",
    text: "text-orange-950",
    bgBlur: "bg-orange-400/10",
    borderColor: "border-orange-300/40",
  },
  {
    id: "1y",
    name: "Ultimate",
    tag: "1 year · Best value",
    price: "499",
    period: "ETB",
    priceEtb: 499,
    starsPrice: 200,
    recommended: true,
    note: "The complete experience.",
    theme: "from-amber-200/80 via-yellow-400/70 to-amber-500/80",
    text: "text-amber-950",
    bgBlur: "bg-amber-400/10",
    borderColor: "border-amber-300/40",
  },
];

const REPEAT_COUNT = 15;
const CARD_W = 280;
const GAP = 16;

function PricingPlanCard({
  plan,
  isActive,
  isLeft,
  isRight,
}) {
  const neighbor = isLeft || isRight;
  const stars = plan.starsPrice;
  return (
    <div
      className={[
        "relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-3xl border p-6 shadow-lg transition-all duration-500 ease-out",
        plan.borderColor,
        isActive
          ? "z-20 scale-100 opacity-100 active-card-shimmer-app"
          : neighbor
            ? "z-10 scale-[0.92] opacity-[0.72]"
            : "z-0 scale-[0.88] opacity-40",
      ].join(" ")}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.theme}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl ${plan.bgBlur} backdrop-blur-xl`}
      />
      <div
        className={`relative z-10 flex min-h-[320px] flex-col ${plan.text} ${isActive ? "animate-float-app" : ""}`}
      >
        {plan.recommended ? (
          <span className="mb-2 inline-flex w-fit rounded-full bg-black/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/70">
            Recommended
          </span>
        ) : null}
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
          {plan.tag}
        </span>
        <h3 className="mt-1 text-2xl font-black tracking-tight">{plan.name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-black tabular-nums">{plan.price}</span>
          <span className="text-sm font-semibold opacity-70">{plan.period}</span>
        </div>
        {stars != null ? (
          <div className="mt-3 space-y-1 rounded-xl bg-black/10 px-3 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wide opacity-60">
              Telegram Stars
            </p>
            <p className="text-lg font-black tabular-nums leading-tight">
              {stars.toLocaleString()} Stars
            </p>
            <p className="text-[10px] font-medium leading-snug opacity-65">
              Charged in-app via Telegram at checkout, or pay the ETB amount shown above.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-[11px] font-semibold opacity-60">Free tier — no Stars</p>
        )}
        <p className="mt-4 flex-1 text-sm font-medium leading-relaxed opacity-80">
          {plan.note}
        </p>
        <a
          href="#download"
          className="mt-6 block rounded-xl bg-black/15 py-3 text-center text-sm font-bold transition hover:bg-black/25"
        >
          {plan.id === "free" ? "Get started" : "Go Pro"}
        </a>
      </div>
    </div>
  );
}

export function AppPricingCarousel() {
  const sliderRef = useRef(null);
  const plans = APP_PRICING_PLANS;
  const len = plans.length;
  const middleSetStart = Math.floor(REPEAT_COUNT / 2) * len;
  const recommendedIdx = plans.findIndex((p) => p.recommended);
  const initialIndex = middleSetStart + (recommendedIdx >= 0 ? recommendedIdx : 0);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const touchStartRef = useRef(0);

  const displayPlans = useMemo(
    () => Array.from({ length: REPEAT_COUNT }).flatMap(() => [...APP_PRICING_PLANS]),
    [],
  );

  const centerCard = useCallback((index) => {
    const slider = sliderRef.current;
    if (!slider?.children[index]) return;
    const target = slider.children[index];
    const offset =
      target.offsetLeft - (slider.clientWidth - target.offsetWidth) / 2;
    slider.scrollTo({ left: offset, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const t = requestAnimationFrame(() => {
      const target = slider.children[initialIndex];
      if (!target) return;
      const offset =
        target.offsetLeft - (slider.clientWidth - target.offsetWidth) / 2;
      slider.scrollTo({ left: offset, behavior: "auto" });
      setActiveIndex(initialIndex);
    });
    return () => cancelAnimationFrame(t);
  }, [initialIndex]);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const delta = touchStartRef.current - touchEnd;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      if (delta > 0 && activeIndex < displayPlans.length - 1) {
        centerCard(activeIndex + 1);
      } else if (delta < 0 && activeIndex > 0) {
        centerCard(activeIndex - 1);
      }
    } else {
      centerCard(activeIndex);
    }
  };

  const goNext = () => {
    if (activeIndex < displayPlans.length - 1) centerCard(activeIndex + 1);
  };
  const goPrev = () => {
    if (activeIndex > 0) centerCard(activeIndex - 1);
  };

  const padStyle = { paddingLeft: `calc(50% - ${CARD_W / 2}px)`, paddingRight: `calc(50% - ${CARD_W / 2}px)` };

  return (
    <div className="app-pricing-section relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 pb-28 pt-6 text-white shadow-2xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-sky-950/10" />

      <div className="relative z-10 mb-6 px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
          Upgrade your
        </p>
        <h3 className="mt-1 bg-gradient-to-r from-white via-white/85 to-white/50 bg-clip-text text-2xl font-black italic tracking-tight text-transparent md:text-3xl">
          Kenat experience
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[10px] font-bold uppercase leading-relaxed tracking-widest text-white/35">
          Pay in ETB or Telegram Stars in the app
        </p>

      </div>

      <div className="relative z-10 w-full">
        <section
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="app-pricing-no-scrollbar flex w-full touch-pan-x items-center overflow-x-auto scroll-smooth py-4"
          style={{
            ...padStyle,
            gap: GAP,
          }}
        >
          {displayPlans.map((plan, i) => (
            <PricingPlanCard
              key={`${plan.id}-${i}`}
              plan={plan}
              isActive={i === activeIndex}
              isLeft={i === activeIndex - 1}
              isRight={i === activeIndex + 1}
            />
          ))}
        </section>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent px-4 pb-6 pt-10">
        <div className="mx-auto flex max-w-[320px] items-center justify-between gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={`rounded-full border border-white/10 bg-white/5 p-3 transition-all active:scale-95 ${
              activeIndex === 0 ? "pointer-events-none opacity-20" : "hover:bg-white/10"
            }`}
            aria-label="Previous plan"
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            {plans.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show ${p.name}`}
                onClick={() => centerCard(middleSetStart + i)}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  activeIndex % len === i ? "w-10 bg-white" : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === displayPlans.length - 1}
            className={`rounded-full border border-white/10 bg-white/5 p-3 transition-all active:scale-95 ${
              activeIndex === displayPlans.length - 1
                ? "pointer-events-none opacity-20"
                : "hover:bg-white/10"
            }`}
            aria-label="Next plan"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
