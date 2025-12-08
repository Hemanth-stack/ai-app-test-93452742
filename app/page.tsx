import type { Post } from '@/types/post';
import BlogDashboard from './components/BlogDashboard';
import { createClient } from '@/lib/supabase/server';
import { Sparkles } from 'lucide-react';

interface SupabasePostRow {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_url?: string | null;
  tags?: string[] | string | null;
  created_at?: string | null;
  updated_at?: string | null;
  featured?: boolean | null;
  reading_minutes?: number | null;
  author?: string | null;
  views?: number | null;
}

const FALLBACK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Building a modern blog with Next.js 14 and Supabase',
    slug: 'modern-blog-nextjs-supabase',
    excerpt:
      'A deep dive into creating a performant, secure, and delightful reading experience with the latest Next.js App Router and Supabase features.',
    coverUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    tags: ['nextjs', 'supabase', 'fullstack'],
    createdAt: '2024-04-12T10:00:00.000Z',
    updatedAt: '2024-04-14T12:00:00.000Z',
    featured: true,
    readingMinutes: 8,
    author: 'Avery Kim',
    views: 12800,
  },
  {
    id: '2',
    title: 'Designing for readability: a practical guide',
    slug: 'designing-for-readability',
    excerpt:
      'Typography, spacing, and contrast: learn how to craft interfaces that feel effortless to read on any device.',
    coverUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['design', 'ux', 'accessibility'],
    createdAt: '2024-03-02T09:00:00.000Z',
    updatedAt: '2024-03-05T09:00:00.000Z',
    featured: false,
    readingMinutes: 6,
    author: 'Jordan Lee',
    views: 9300,
  },
  {
    id: '3',
    title: 'Edge rendering patterns for SEO and performance',
    slug: 'edge-rendering-patterns',
    excerpt:
      'Learn when to render at the edge, cache smartly, and keep your Lighthouse scores high without sacrificing dynamic content.',
    coverUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['performance', 'seo', 'edge'],
    createdAt: '2024-02-10T12:00:00.000Z',
    updatedAt: '2024-02-11T12:00:00.000Z',
    featured: true,
    readingMinutes: 7,
    author: 'Riley Chen',
    views: 15100,
  },
];

const normalizeTags = (value?: string[] | string | null): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  const parsed = value.includes(',') ? value.split(',') : [value];
  return parsed.map((tag) => tag.trim()).filter(Boolean);
};

const normalizePost = (row: SupabasePostRow): Post => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt ?? 'No summary provided.',
  coverUrl: row.cover_url ?? undefined,
  tags: normalizeTags(row.tags),
  createdAt: row.created_at ?? new Date().toISOString(),
  updatedAt: row.updated_at ?? row.created_at ?? new Date().toISOString(),
  featured: Boolean(row.featured),
  readingMinutes: row.reading_minutes ?? 5,
  author: row.author ?? 'Unknown author',
  views: row.views ?? 0,
});

async function getPosts(): Promise<Post[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(
        'id, title, slug, excerpt, cover_url, tags, created_at, updated_at, featured, reading_minutes, author, views'
      )
      .order('created_at', { ascending: false });

    if (error || !data) {
      return FALLBACK_POSTS;
    }

    return data.map(normalizePost);
  } catch {
    return FALLBACK_POSTS;
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 pb-16 pt-20 text-white">
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