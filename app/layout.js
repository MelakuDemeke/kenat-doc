import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { FaTelegram } from 'react-icons/fa';

import 'nextra-theme-docs/style.css'
import './globals.css';

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="kenat-info">Kenat is a work in progress project 👨🏻‍💻 </Banner>
const navbar = (
  <Navbar
    logo={<div className="flex items-center gap-2">
      <img src="/logo.png" alt="Kenat Logo" className="h-6 w-auto" />
      <span className="font-bold text-lg">Kenat</span>
    </div>}

    projectLink='https://github.com/MelakuDemeke/kenat'
    chatLink='https://t.me/kenat_tool_kit'
    chatIcon={<FaTelegram size={24} />}
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Kenat by &nbsp; <a target='_blank' href="https://github.com/MelakuDemeke/"> @MelakuDemeke</a>.</Footer>

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
        {/* SEO meta tags */}
        <title>Kenat Ethiopian Calendar Toolkit</title>
        <meta name="description" content="Kenat provides a robust, standalone library for all your Ethiopian calendar needs. Date conversion, holidays, Bahire Hasab, and more." />
        <meta property="og:title" content="Kenat Ethiopian Calendar Toolkit" />
        <meta property="og:description" content="Kenat provides a robust, standalone library for all your Ethiopian calendar needs. Date conversion, holidays, Bahire Hasab, and more." />
        <meta property="og:url" content="https://www.kenat.systems" />
        <meta property="og:image" content="/ogimage.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kenat Ethiopian Calendar Toolkit" />
        <meta name="twitter:description" content="Kenat provides a robust, standalone library for all your Ethiopian calendar needs." />
        <meta name="twitter:image" content="/ogimage.png" />

        {/* Structured Data for Google Rich Results */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kenat Ethiopian Calendar Toolkit",
          "url": "https://www.kenat.systems",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.kenat.systems/search?q={search_term_string}",
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
          footer={footer}
        // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}