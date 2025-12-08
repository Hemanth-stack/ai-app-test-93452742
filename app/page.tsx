import BlogDashboard from './components/BlogDashboard';
import { fetchAllPosts } from '@/lib/posts';
import { Sparkles } from 'lucide-react';

export default async function HomePage() {
  const posts = await fetchAllPosts();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 pb-16 pt-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_25%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Modern Personal Blog
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Publish, discover, and grow with a cutting-edge blog experience.
              </h1>
              <p className="text-lg text-blue-50">
                Fast, secure, and delightful by default. Search, filter, and explore stories with
                a fully featured experience built on Next.js 14 and Supabase.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#posts"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                >
                  Browse posts
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  View source
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="space-y-3 text-sm text-blue-50">
                <p className="font-semibold text-white">What’s inside</p>
                <ul className="space-y-2">
                  <li>✓ Supabase-auth-ready foundation</li>
                  <li>✓ Search, sort, and tag filtering</li>
                  <li>✓ Responsive, accessible UI</li>
                  <li>✓ Featured highlights and stats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="posts" className="mx-auto -mt-10 max-w-6xl px-6 pb-16">
        <BlogDashboard posts={posts} />
      </section>
    </main>
  );
}