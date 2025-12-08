import BlogDashboard from '@/app/components/BlogDashboard';
import { fetchAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'All Posts | Modern Personal Blog',
  description: 'Browse all published posts with filtering and search.',
};

export default async function PostsPage() {
  const posts = await fetchAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Explore</p>
        <h1 className="text-3xl font-bold text-gray-900">All posts</h1>
        <p className="mt-2 text-sm text-gray-600">
          Search, sort, and filter across the entire library.
        </p>
      </header>
      <BlogDashboard posts={posts} />
    </main>
  );
}