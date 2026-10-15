# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: developers building software for Ethiopian users who need correct Ethiopian calendar logic (conversion, holidays, Bahire Hasab, Ge'ez numerals, calendar UI state). They arrive to evaluate the library, install it, try it live, and read the docs.
Secondary: everyday users of the Kenat Android calendar app (the `/app` page and blog posts about app releases).

## Product Purpose
Kenat is an open-source Ethiopian calendar toolkit. This site (kenat-doc) is its home: landing page, documentation (Nextra), interactive tools, blog, and the Kenat app page. Success means a developer understands what Kenat does, installs it, and finds the right docs quickly.

## Positioning
A complete, multi-language Ethiopian calendar toolkit with feature parity across JavaScript/TypeScript (`kenat`, `kenat-ui` headless hooks), Python (`kenat_py`), Dart (`kenat-dart`), PHP (`kenat-php`) and a CLI (`kenat-cli`), backed by a consumer Android app built on the same engine.

## Operating Context
- Docs live under `/doc` (Nextra 4 docs theme), tools under `/tools`, blog under `/blog`, app page under `/app`.
- Landing page fetches live total downloads from `/api/downloads`.
- Live Amharic date/time and an interactive playground render on the home page.

## Capabilities and Constraints
- Next.js 15 App Router, Nextra 4 docs theme, Tailwind CSS 4, react-icons, `kenat` + `kenat-ui` packages.
- Light and dark themes are both supported via Nextra's theme switch; both must be maintained.
- Pagefind search index is built post-build.

## Brand Commitments
- Name: Kenat (ቀናት). Logo at `/public/logo.png`.
- Look must be clean, modern and minimal (owner, 2026-10-15). Owner rejected a manuscript/parchment direction and all decorative patterns; Ethiopian identity comes from content (live Ethiopian date, Amharic text), not ornament.
- Links: GitHub `MelakuDemeke/kenat`, Telegram `t.me/kenat_bot`, Play Store `me.melaku.kenat`.

## Evidence on Hand
- Real download count via `/api/downloads`.
- Blog posts and app screenshots in `/public/blog/`.
- No testimonials, user counts, or benchmarks exist; do not fabricate them.

## Product Principles
1. Developers first on the home page: install, try, read docs.
2. Correctness of Ethiopian calendar data is the product; show real computed dates, not mock values.
3. Ethiopian identity comes from real content (dates, Amharic), never from decorative patterns or styling.
4. Docs readability outranks expression on `/doc` pages.
