const APP_ICON_PATH = '/kenat%20icon.png';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ethiopian calendar | Kenat',
  alternateName: ['Kenat', 'Kenat Ethiopian calendar'],
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Android, Windows 10, Windows 11',
  description:
    'Ethiopian calendar app for Android and Windows with accurate Ethiopian–Gregorian conversion, Bahire Hasab, holidays and fasts, events and tasks, widgets, and optional Pro sync and Telegram integration.',
  image: `https://kenat.et${APP_ICON_PATH}`,
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
  title: { absolute: 'Kenat: Ethiopian Calendar App for Android & Windows' },
  alternates: { canonical: '/app' },
  description:
    'Kenat is the Ethiopian calendar app for Android and Windows: both calendars on every day, holidays and fasts, Bahire Hasab, date conversion, events and tasks with Ethiopian repeats, and widgets. Pro adds an ad-free experience, Telegram integration and cross-device sync.',
  openGraph: {
    title: 'Ethiopian calendar | Kenat',
    description:
      'Both calendars on every day, holidays, Bahire Hasab and your events. Get Kenat for Android and Windows.',
    url: 'https://kenat.et/app',
    siteName: 'Kenat',
    images: [
      {
        url: 'https://kenat.et/kenat%20icon.png',
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
      'Ethiopian–Gregorian conversion, Bahire Hasab, holidays and widgets. For Android and Windows.',
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
