/**
 * Hero backdrop: a fine grid that fades out from the top. Pure SVG/CSS, no
 * images. The sky glow lives with the Today card in app/page.js.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[860px] overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_30%,transparent_100%)]"
      >
        <defs>
          <pattern id="kenat-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
            <path d="M40 0H0V40" fill="none" stroke="var(--grid-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kenat-hero-grid)" />
      </svg>
    </div>
  );
}
