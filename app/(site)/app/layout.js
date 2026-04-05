const APP_ICON_PATH = '/kenat%20icon.png';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ethiopian calendar | Kenat',
  alternateName: ['Kenat', 'Kenat Ethiopian calendar'],
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Android, iOS',
  description:
    'Ethiopian calendar app with accurate Ethiopic–Gregorian conversion, Bahire Hasab, holidays, and optional Pro sync and Telegram integration.',
  image: `https://www.kenat.systems${APP_ICON_PATH}`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'ETB',
    description: 'Free tier with optional Pro subscriptions in ETB or Telegram Stars.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
};

export const metadata = {
  title: 'Ethiopian calendar | Kenat — Android & iOS',
  description:
    'Kenat is the best Ethiopian calendar app for Android and iOS. Featuring accurate date conversion, Bahire Hasab, holiday tracking, and cloud sync. Upgrade to Pro for an ad-free experience, Telegram integration, and cross-device sync. Download the ultimate Ethiopic toolkit today.',
  openGraph: {
    title: 'Ethiopian calendar | Kenat',
    description:
      'Precision date conversion, Bahire Hasab, holidays, and Pro cloud sync. Download Kenat for Android and iOS.',
    url: 'https://www.kenat.systems/app',
    siteName: 'Kenat',
    images: [
      {
        url: 'https://www.kenat.systems/kenat%20icon.png',
        width: 512,
        height: 512,
        alt: 'Kenat app icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopian calendar | Kenat',
    description:
      'Ethiopic–Gregorian conversion, Bahire Hasab, holidays, and Pro features. For Android & iOS.',
  },
};

export default function AppDetailLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
