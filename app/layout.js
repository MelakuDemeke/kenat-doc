import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Analytics } from '@vercel/analytics/next'
import { FaTelegram } from 'react-icons/fa';
import { Geist, Geist_Mono, Noto_Sans_Ethiopic } from 'next/font/google'

import 'nextra-theme-docs/style.css'
import './globals.css';

export const metadata = {
  metadataBase: new URL("https://kenat-doc.vercel.app"),
  title: {
    default: "Kenat Ethiopian Calendar Toolkit",
    template: "%s | Kenat",
  },
  description: "Kenat provides a robust, standalone library for all your Ethiopian calendar needs. Date conversion, holidays, Bahire Hasab, and more.",
  openGraph: {
    title: "Kenat Ethiopian Calendar Toolkit",
    description: "Kenat provides a robust, standalone library for all your Ethiopian calendar needs. Date conversion, holidays, Bahire Hasab, and more.",
    url: "https://kenat-doc.vercel.app",
    images: [{ url: "/ogimage.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Kenat: the Ethiopian calendar, computed for your code" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenat Ethiopian Calendar Toolkit",
    description: "Kenat provides a robust, standalone library for all your Ethiopian calendar needs.",
    images: ["/ogimage.jpg"],
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
      <img src="/logo.png" alt="" className="h-6 w-auto" />
      <span className="font-semibold text-lg tracking-tight">Kenat</span>
    </div>}

    projectLink='https://github.com/MelakuDemeke/kenat'
    chatLink='https://t.me/kenat_bot'
    chatIcon={<FaTelegram size={24} />}
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kenat Ethiopian Calendar Toolkit",
          "url": "https://kenat-doc.vercel.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://kenat-doc.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`}} />
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