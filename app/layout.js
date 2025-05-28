import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
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
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
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