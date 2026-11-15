import { clsx } from "clsx";
import { FaWindows } from "react-icons/fa";

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=me.melaku.kenat";

// Opens the Microsoft Store app on Windows at Kenat's listing (package family
// name). Swap for the https://apps.microsoft.com/detail/<product id> link once
// the web listing is public, so it also works from other systems.
export const MICROSOFT_STORE_URL =
  "ms-windows-store://pdp/?PFN=AddisCode.EthiopianCalendarKenat_2fbrtmxr0h1zy";

/** Google Play badge and a matching Microsoft Store button, same height. */
export function StoreButtons({ className, size = "md" }) {
  const h = size === "lg" ? "h-[52px]" : "h-11";
  return (
    <div className={clsx("flex flex-wrap items-center gap-3", className)}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex transition-transform hover:-translate-y-px"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className={clsx(h, "w-auto")} />
      </a>
      <a
        href={MICROSOFT_STORE_URL}
        title="Opens the Microsoft Store app on Windows"
        className={clsx(
          h,
          "inline-flex items-center gap-2.5 rounded-[9px] bg-black px-3.5 text-white ring-1 ring-inset ring-zinc-600 transition-transform hover:-translate-y-px"
        )}
      >
        <FaWindows aria-hidden="true" className={size === "lg" ? "text-[22px]" : "text-[19px]"} />
        <span className="flex flex-col leading-none">
          <span className="text-[9.5px] tracking-[0.02em] text-zinc-300">Get it from</span>
          <span className={clsx("font-semibold tracking-[-0.01em]", size === "lg" ? "text-[17px]" : "text-[15px]")}>
            Microsoft
          </span>
        </span>
      </a>
    </div>
  );
}
