'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import type { FC, FormEvent, ReactNode } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Eye,
  Filter,
  Search,
  Sparkles,
  Tag,
  ThumbsUp,
} from 'lucide-react';
import type { Post } from '@/types/post';

interface BlogDashboardProps {
  posts: Post[];
}

type SortKey = 'newest' | 'oldest' | 'popular' | 'reading';

const sortPosts = (posts: Post[], sortKey: SortKey): Post[] => {
  switch (sortKey) {
    case 'oldest':
      return [...posts].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case 'popular':
      return [...posts].sort((a, b) => b.views - a.views);
    case 'reading':
      return [...posts].sort((a, b) => a.readingMinutes - b.readingMinutes);
    case 'newest':
    default:
      return [...posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
};

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

interface PostCardProps {
  post: Post;
  view: 'grid' | 'list';
}

const PostCard: FC<PostCardProps> = memo(function PostCard({ post, view }) {
  return (
    <article
      className={`group relative flex ${
        view === 'grid' ? 'flex-col' : 'flex-row'
      } overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md`}
    >
      <div
        className={`${
          view === 'grid' ? 'h-44 w-full' : 'h-full w-44'
        } relative flex-shrink-0 overflow-hidden bg-gray-100`}
      >
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={`Cover image for ${post.title}`}
            fill
            sizes={view === 'grid' ? '(min-width: 768px) 50vw, 100vw' : '176px'}
            className="object-cover"
            priority={post.featured}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-50" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-blue-600">
          {post.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Featured
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-gray-700">
            <Tag className="h-3 w-3" aria-hidden="true" />
            {post.tags[0] ?? 'General'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-700">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {formatDate(post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
            <Eye className="h-4 w-4" aria-hidden="true" />
            {post.views.toLocaleString()} views
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-center text-sm font-semibold leading-8 text-white">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            Appreciate
          </button>
        </div>
      </div>
    </article>
  );
});

interface StatsCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

const StatsCard: FC<StatsCardProps> = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const Newsletter: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email.includes('@')) {
        setStatus('error');
        setMessage('Please enter a valid email address.');
        return;
      }
      setStatus('success');
      setMessage('You are subscribed! Stay tuned for updates.');
      setEmail('');
    },
    [email]
  );

  return (
    <section
      id="newsletter"
      aria-label="Subscribe to newsletter"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Stay in the loop</p>
          <h3 className="text-xl font-semibold text-gray-900">
            Get the latest posts straight to your inbox
          </h3>
          <p className="text-sm text-gray-600">
            No spam. Unsubscribe anytime. Fresh stories and engineering notes.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-64"
            placeholder="you@example.com"
            aria-invalid={status === 'error'}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
      {status !== 'idle' && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === 'success' ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
};

const BlogDashboard: FC<BlogDashboardProps> = ({ posts }) => {
  const [query, setQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const availableTags = useMemo<string[]>(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return ['all', ...Array.from(tags)];
  }, [posts]);

  const filteredPosts = useMemo<Post[]>(() => {
    const byQuery = posts.filter((post) => {
      const text = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
    const byTag =
      selectedTag === 'all'
        ? byQuery
        : byQuery.filter((post) => post.tags.includes(selectedTag));
    const byFeatured = onlyFeatured ? byTag.filter((post) => post.featured) : byTag;
    return sortPosts(byFeatured, sortKey);
  }, [posts, query, selectedTag, onlyFeatured, sortKey]);

  const stats = useMemo(
    () => ({
      total: posts.length,
      featured: posts.filter((post) => post.featured).length,
      totalViews: posts.reduce((acc, post) => acc + post.views, 0),
      avgRead: posts.length
        ? (posts.reduce((acc, post) => acc + post.readingMinutes, 0) / posts.length).toFixed(1)
        : '0',
    }),
    [posts]
  );

  return (
    <section aria-label="Blog dashboard" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total posts" value={stats.total.toString()} icon={<Sparkles />} />
        <StatsCard label="Featured" value={stats.featured.toString()} icon={<Tag />} />
        <StatsCard label="Total views" value={stats.totalViews.toLocaleString()} icon={<Eye />} />
        <StatsCard label="Avg. read (min)" value={stats.avgRead} icon={<Clock />} />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Advanced filters
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                aria-label="Search posts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Search title, summary, or tags"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">Tag</span>
              <select
                value={selectedTag}
                onChange={(event) => setSelectedTag(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All tags' : tag}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">Sort</span>
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most viewed</option>
                <option value="reading">Shortest read</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(event) => setOnlyFeatured(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              Featured only
            </label>
            <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-pressed={view === 'grid'}
                className={`rounded-md px-3 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  view === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
                className={`rounded-md px-3 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  view === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-lg font-semibold text-gray-800">No posts found</p>
            <p className="text-sm text-gray-600">
              Try adjusting your search, filters, or explore other tags.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-4 ${view === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}
            role="list"
            aria-label="Posts list"
          >
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} view={view} />
            ))}
          </div>
        )}
      </div>

      <Newsletter />
    </section>
  );
};

export default BlogDashboard;