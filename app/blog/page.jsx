import { getPageMap } from "nextra/page-map";
import { BlogPostCard } from "@/components/BlogPostCard";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Blog | Kenat Ethiopian Calendar Toolkit",
  description: "Release notes and updates for the Kenat Ethiopian calendar toolkit.",
};

async function getPosts() {
  const pageMap = await getPageMap("/blog");
  return pageMap
    .filter((item) => item.name !== "index" && item.frontMatter)
    .map((item) => ({
      href: item.route,
      title: item.frontMatter.title ?? item.name,
      description: item.frontMatter.description,
      date: item.frontMatter.date,
      image: item.frontMatter.image,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="k-page min-h-screen overflow-x-clip">
      <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-16 pb-24 lg:pt-24">
        <header className="max-w-3xl">
          <h1 className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
            Blog
          </h1>
          <p className="mt-5 text-lg sm:text-xl k-muted leading-relaxed max-w-2xl">
            Updates, new releases, and behind-the-scenes notes from across the Kenat ecosystem.
          </p>
        </header>

        <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <p className="k-muted">No posts yet — check back soon.</p>
          ) : (
            posts.map((post) => <BlogPostCard key={post.href} {...post} />)
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
