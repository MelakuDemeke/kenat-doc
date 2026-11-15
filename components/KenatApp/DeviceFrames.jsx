import { clsx } from "clsx";

/** Phone screenshots are 620 × 1343 (Galaxy A56, 19.5:9). */
export const PHONE_RATIO = "620 / 1343";
/** Desktop screenshots are the 1360 × 832 client area of the Kenat window. */
export const DESKTOP_RATIO = "1360 / 832";

/**
 * A phone around a screenshot: graphite rim, thin even bezel, rounded screen.
 * The screenshot already carries its own status bar and camera hole.
 */
export function PhoneFrame({ src, alt, className, eager = false }) {
  return (
    <div
      className={clsx(
        "rounded-[13%/6%] bg-zinc-800 p-[2.4%] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_30px_60px_-30px_rgb(0_0_0/0.55)] ring-1 ring-zinc-900/80 dark:bg-zinc-800 dark:ring-zinc-700",
        className
      )}
    >
      <div className="overflow-hidden rounded-[11%/5%] bg-black" style={{ aspectRatio: PHONE_RATIO }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={620}
          height={1343}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/**
 * A Windows 11 app window around a desktop screenshot: the title bar is the
 * app's own surface colour (Kenat recolours it), with the system buttons.
 */
export function WindowFrame({ src, alt, className, eager = false, children }) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl bg-[#18181b] ring-1 ring-black/10 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] dark:ring-white/10",
        className
      )}
    >
      <div className="flex h-8 items-center justify-between pl-3.5 text-[11px] text-zinc-400" aria-hidden="true">
        <span className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kenat%20icon.png" alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-[3px]" />
          Kenat
        </span>
        <span className="flex h-full">
          <span className="grid w-11 place-items-center">
            <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor" /></svg>
          </span>
          <span className="grid w-11 place-items-center">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" /></svg>
          </span>
          <span className="grid w-11 place-items-center">
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0.5 0.5l9 9M9.5 0.5l-9 9" stroke="currentColor" /></svg>
          </span>
        </span>
      </div>
      <div className="relative" style={{ aspectRatio: DESKTOP_RATIO }}>
        {children ?? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            width={1360}
            height={832}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
