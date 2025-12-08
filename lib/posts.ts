import type { Post } from '@/types/post';
import { createClient } from '@/lib/supabase/server';

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

export async function fetchAllPosts(): Promise<Post[]> {
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

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(
        'id, title, slug, excerpt, cover_url, tags, created_at, updated_at, featured, reading_minutes, author, views'
      )
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      const fallback = FALLBACK_POSTS.find((post) => post.slug === slug);
      return fallback ?? null;
    }

    return normalizePost(data);
  } catch {
    const fallback = FALLBACK_POSTS.find((post) => post.slug === slug);
    return fallback ?? null;
  }
}

export async function fetchPostsByTag(tag: string): Promise<Post[]> {
  if (!tag) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select(
        'id, title, slug, excerpt, cover_url, tags, created_at, updated_at, featured, reading_minutes, author, views'
      )
      .contains('tags', [tag])
      .order('created_at', { ascending: false });

    if (error || !data) {
      return FALLBACK_POSTS.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    }

    return data.map(normalizePost);
  } catch {
    return FALLBACK_POSTS.filter((post) =>
      post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }
}

export { FALLBACK_POSTS };