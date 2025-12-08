import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Eye, Tag, ArrowLeft, Sparkles } from 'lucide-react';
import { fetchAllPosts, fetchPostBySlug } from '@/lib/posts';
import type { Post } from '@/types/post';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | Modern Personal Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await fetchAllPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-12">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to posts
        </Link>
        {post.featured && (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-blue-600">Article</p>
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="text-lg text-gray-700">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
                new Date(post.createdAt)
              )}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
              <Eye className="h-4 w-4" aria-hidden="true" />
              {post.views.toLocaleString()} views
            </span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-gray-700 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Tag className="h-4 w-4" aria-hidden="true" />
                {tag}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-center text-base font-semibold leading-10 text-white">
              {post.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-600">Author</p>
            </div>
          </div>
        </header>

        <section className="prose prose-gray max-w-none">
          <p>
            {post.excerpt}{' '}
            This article explores best practices, architectural choices, and implementation details
            to build resilient, performant, and accessible web experiences. Stay tuned for the full
            deep dive, including code samples and deployment notes.
          </p>
          <p>
            In future updates, we will add complete content rendering sourced from the Supabase
            database, including rich media, code blocks, and interactive components.
          </p>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Related posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link
                key={item.id}
                href={`/posts/${item.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <p className="text-sm font-semibold text-blue-600">{item.tags[0] ?? 'General'}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                  {item.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}