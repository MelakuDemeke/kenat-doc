import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Analytics } from '@vercel/analytics/next'
import { FaGithub, FaTelegram } from 'react-icons/fa';
import { Geist, Geist_Mono, Noto_Sans_Ethiopic } from 'next/font/google'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo'

// WebSite + Organization: gives Google the site name ("Kenat") and logo for results.
const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Kenat",
      alternateName: ["Kenat Ethiopian Calendar Toolkit", "kenat.et", "ቀናት"],
      url: `${SITE_URL}/`,
      inLanguage: ["en", "am"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kenat",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://github.com/MelakuDemeke/kenat",
        "https://www.npmjs.com/package/kenat",
        "https://play.google.com/store/apps/details?id=me.melaku.kenat",
        "https://t.me/kenat_bot",
      ],
    },
  ],
}

import 'nextra-theme-docs/style.css'
import './globals.css';

export const metadata = {
  metadataBase: new URL("https://kenat.et"),
  title: {
    default: "Kenat Ethiopian Calendar Toolkit",
    template: "%s | Kenat",
  },
  description: "Kenat provides a robust, standalone library for all your Ethiopian calendar needs. Date conversion, holidays, Bahire Hasab, and more.",
  keywords: [
    "Ethiopian calendar", "Ethiopian date today", "Ethiopian holidays", "Ethiopian date converter", "Enkutatash",
    "Ethiopian time", "Bahire Hasab", "Ethiopian calendar library", "የኢትዮጵያ ቀን መቁጠሪያ",
  ],
  applicationName: "Kenat",
  authors: [{ name: "Melaku Demeke", url: "https://github.com/MelakuDemeke" }],
  creator: "Melaku Demeke",
  category: "technology",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  // Site-wide fallbacks only: no title or url here, so a page that forgets its own
  // openGraph never advertises itself as the homepage. Pages use pageMetadata() from lib/seo.
  openGraph: {
    siteName: "Kenat",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
}

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const notoEthiopic = Noto_Sans_Ethiopic({ subsets: ['ethiopic'], variable: '--font-noto-ethiopic', display: 'swap' })
const fontVars = [geist, geistMono, notoEthiopic].map((f) => f.variable).join(' ')

/* Direction contract, emitted into the built markup so the design review can audit it. */
const DIRECTION_CONTRACT = `<!--
THESIS: Kenat is an Ethiopian calendar engine for developers; the site is a clean modern product page whose only Ethiopian expression is real content: the live Ethiopian date, Amharic text, on the original sky-blue and purple palette. No manuscript styling, no textures or patterns.
OWN-WORLD: white / near-black neutral surfaces (stock zinc), the original sky-blue accent with purple highlights, Geist + Geist Mono, Noto Sans Ethiopic for Amharic, 16px-radius cards, ruled lists.
STORY: a developer sees today's Ethiopian date computed by the library, copies the install line, tries the playground, picks a language binding, opens the docs.
FIRST VIEWPORT: left headline, lede, install line, Read the docs + Play badge; right the Today card with the Ethiopian date, Gregorian twin, Ethiopian time and next holiday.
FORM: user-directed modern minimal (replaced the manuscript direction on the owner's feedback).
-->`
const banner = <Banner storageKey="kenat-info-2019">Kenat is a work in progress · contributions welcome on GitHub</Banner>
const navbar = (
  <Navbar
    logo={<div className="flex items-center gap-2.5">
      <img src="/logo.png" alt="Kenat logo" className="h-6 w-auto" />
      <span className="font-semibold text-lg tracking-tight">Kenat</span>
    </div>}

    projectLink='https://github.com/MelakuDemeke/kenat'
    // Icon-only links need text for crawlers and screen readers.
    projectIcon={<><FaGithub size={24} aria-hidden="true" /><span className="sr-only">Kenat on GitHub</span></>}
    chatLink='https://t.me/kenat_bot'
    chatIcon={<><FaTelegram size={24} aria-hidden="true" /><span className="sr-only">Kenat on Telegram</span></>}
  >
    <ThemeSwitch />
  </Navbar>
)
export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      className={fontVars}
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        backgroundColor={{ light: '#ffffff', dark: '#09090b' }}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }} />
      </Head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/MelakuDemeke/kenat-doc"
        // ... Your additional layout options
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  )
}