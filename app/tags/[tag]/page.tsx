import { notFound } from 'next/navigation';
import BlogDashboard from '@/app/components/BlogDashboard';
import { fetchPostsByTag } from '@/lib/posts';

interface TagPageProps {
  params: { tag: string };
}

export async function generateMetadata({ params }: TagPageProps) {
  const readableTag = decodeURIComponent(params.tag);
  return {
    title: `${readableTag} posts | Modern Personal Blog`,
    description: `Browse posts tagged with ${readableTag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await fetchPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Tag</p>
        <h1 className="text-3xl font-bold text-gray-900">{tag}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Posts curated for the &ldquo;{tag}&rdquo; topic.
        </p>
      </header>
      <BlogDashboard posts={posts} />
    </main>
  );
}