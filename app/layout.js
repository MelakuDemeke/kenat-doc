import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Analytics } from '@vercel/analytics/next'
import { FaTelegram, FaLaptopCode } from 'react-icons/fa';

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
    images: [{ url: "/ogimage.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenat Ethiopian Calendar Toolkit",
    description: "Kenat provides a robust, standalone library for all your Ethiopian calendar needs.",
    images: ["/ogimage.png"],
  },
}

const banner = <Banner storageKey="kenat-info">Kenat is a work in progress project <FaLaptopCode className="inline-block align-text-bottom" /></Banner>
const navbar = (
  <Navbar
    logo={<div className="flex items-center gap-2">
      <img src="/logo.png" alt="Kenat Logo" className="h-6 w-auto" />
      <span className="font-bold text-lg">Kenat</span>
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
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head>
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