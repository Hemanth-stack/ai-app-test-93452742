import HomeHero from './components/metadata';
import BlogDashboard from './components/BlogDashboard';
import { fetchAllPosts } from '@/lib/posts';
import type { Post } from '@/types/post';

export const metadata = {
  title: 'Modern Personal Blog',
  description: 'Publish, discover, and explore with a feature-rich blog experience.',
};

export default async function Home(): Promise<JSX.Element> {
  let posts: Post[] = [];
  try {
    posts = await fetchAllPosts();
  } catch {
    posts = [];
  }

  return (
    <main className="min-h-screen">
      <HomeHero postsAnchorId="posts" />
      <section id="posts" className="mx-auto -mt-10 max-w-6xl px-6 pb-16">
        <BlogDashboard posts={posts} />
      </section>
    </main>
  );
}