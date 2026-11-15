const title = "Kenat, Now on Windows";
const description =
  "Kenat for Windows brings the Ethiopian calendar to your PC: a landscape calendar, the date in the tray, desktop and Widgets Board widgets, keyboard shortcuts and sync with your phone. Plus what's new in Kenat 2.3 on Android.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/blog/kenat-for-windows" },
  openGraph: {
    title,
    description,
    images: [{ url: "/blog/kenat-windows-cover.png", width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog/kenat-windows-cover.png"],
  },
};

export default function Layout({ children }) {
  return children;
}
