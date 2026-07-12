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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-sky-500/30 relative overflow-x-hidden bg-grid-dots">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="pt-12 pb-4 text-center space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-sky-500 font-semibold">
            Release Notes
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Kenat <span className="text-gradient-sky-purple">Blog</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Updates, new releases, and behind-the-scenes notes from across the Kenat ecosystem.
          </p>
        </section>

        <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />

        <section>
          {posts.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.href} {...post} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
