// Post titles already name Kenat, so posts (child segments) skip the root " | Kenat" suffix.
// The /blog index page itself sits in this segment and keeps the root template.
export const metadata = {
  title: { default: "Kenat Blog", template: "%s" },
};

export default function BlogLayout({ children }) {
  return children;
}
