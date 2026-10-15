---
name: Kenat
description: Modern, minimal product site for the Kenat Ethiopian calendar toolkit.
colors:
  bg: "#ffffff"
  surface: "#f6f6f5"
  fg: "#0b0b0c"
  muted: "#52525b"
  subtle: "#71717a"
  border: "#e4e4e7"
  accent: "#0369a1"
  accent-2: "#9333ea"
  accent-soft: "#f0f9ff"
  btn-bg: "#18181b"
  btn-fg: "#ffffff"
  code-bg: "#0b0b0c"
  code-fg: "#e4e4e7"
colors-dark:
  bg: "#09090b"
  surface: "#111113"
  fg: "#fafafa"
  muted: "#a1a1aa"
  subtle: "#8b8b94"
  border: "#27272a"
  accent: "#38bdf8"
  accent-2: "#c084fc"
  accent-soft: "rgb(14 165 233 / 0.12)"
  btn-bg: "#ffffff"
  btn-fg: "#09090b"
fonts:
  sans: Geist
  mono: Geist Mono
  amharic: Noto Sans Ethiopic
radius:
  card: 16px
  button: 10px
  control: 8px
---

# Kenat design system

## Direction

Clean, modern and minimal. The Ethiopian identity comes only from real content: the live Ethiopian date and Amharic text set in Noto Sans Ethiopic. Colors are the site's original palette: zinc neutrals, sky-blue accent, purple highlights. The owner rejected a green accent. The site owner explicitly rejected decorative cultural styling.

**Never use** manuscript or parchment looks, textile or interlace patterns, background textures, decorative Ge'ez lettering, or Ge'ez punctuation as ornament.

## Color

- Stock Tailwind zinc neutrals with sky as the accent and purple as the secondary highlight. Role tokens live in `app/globals.css`: `--bg`, `--surface`, `--fg`, `--muted`, `--subtle`, `--border`, `--accent`, `--accent-2`, `--accent-soft`, `--btn-bg`, `--btn-fg`, `--code-bg`, `--code-fg`. Dark mode overrides them under `.dark`.
- Tailwind color scales are not remapped; `sky-*` and `purple-*` utilities are the stock values.
- Use `--accent` (sky-700 in light, sky-400 in dark) for accent text. Primary buttons are zinc-900 with white text in light mode and white with near-black text in dark mode.
- Selected and today states use `sky-500`; holiday markers use purple.
- Red is reserved for errors.

## Type

- Geist for all Latin text and Geist Mono for code and install commands only. Noto Sans Ethiopic for Amharic, through the `.k-am` class or the font fallback.
- Headings are semibold with tight tracking (-0.035em to -0.045em). Body text uses `--muted`.
- The hero headline sets its second clause in the accent color.

## Components

These are the `.k-*` primitives in `app/globals.css`:

- `.k-card`: 1px border, 16px radius and a soft shadow; on dark surfaces the background becomes `--surface`.
- `.k-btn` is the primary action (`--btn-bg` / `--btn-fg`); `.k-btn-ghost` is the secondary action.
- `.k-link`, `.k-accent`, `.k-muted`, `.k-subtle` and `.k-border` are text, link and border helpers.
- Segmented controls (package-manager tabs, playground tabs) sit on a `--surface` track, with the active item raised on `--bg`.
- Today card (`components/Landing/TodayCard.jsx`): a live Ethiopian date with its Gregorian equivalent, Ethiopian time and next holiday. A soft sky glow sits centered directly behind it, and seven language chips (`components/Landing/OrbitingLanguageIcons.jsx`) float around its edges from `md` up. Below `xl` the side chips tuck in so they never cover hero text.
- Ethiopian clock (`components/EthiopianClockFace.jsx`, wrapped by `components/EthiopianTimePanel.jsx`): an SVG face with Ethiopian hour numerals (Ge'ez or Arabic), 12 at sunrise and sunset, a sun/moon day–night badge, and a smooth `requestAnimationFrame` second hand in sky. It uses the `--clock-*` tokens and is reused in the playground, the docs clock example and `/tools/time-converter`.
- Tool cards, blog cards and engine features are `.k-card` grids with a sky icon tile. Language bindings are rows inside a single card, each with its language logo.
- An "Apps built with Kenat" strip under the hero shows Play Store icons from `public/apps/`.
- Hero backdrop (`components/Landing/HeroBackdrop.jsx`): a 40px SVG grid in `--grid-line` that fades out from the top through a radial mask, with the sky glow attached to the Today card. Never use purple gradients or glows; purple is only for small holiday markers.

## Layout and motion

- Sections are capped at `max-w-[88rem]` and index pages at `72rem`. Horizontal gutters are 20px, 32px or 48px by breakpoint.
- One load animation, `.k-rise`, on the Today card; it is disabled under reduced motion. Hover effects are limited to small lifts and color changes.
- Nextra docs use Nextra's default blue primary, with a white or `#09090b` background.
