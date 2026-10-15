export const metadata = {
  title: "Kenat Moves to kenat.et, With a New Look",
  description: "The Kenat site has a new address, kenat.et, a cleaner modern design, live Ethiopian date pages for today, every holiday and every year, and a showcase of the apps built with Kenat.",
  alternates: { canonical: "/blog/kenat-et-new-home-new-look" },
  openGraph: {
    title: "Kenat Moves to kenat.et, With a New Look",
    description: "The Kenat site has a new address, kenat.et, a cleaner modern design, live Ethiopian date pages for today, every holiday and every year, and a showcase of the apps built with Kenat.",
    images: [{ url: "/blog/kenat-et-cover.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenat Moves to kenat.et, With a New Look",
    description: "The Kenat site has a new address, kenat.et, a cleaner modern design, live Ethiopian date pages for today, every holiday and every year, and a showcase of the apps built with Kenat.",
    images: ["/blog/kenat-et-cover.png"],
  },
};

export default function Layout({ children }) {
  return children;
}
