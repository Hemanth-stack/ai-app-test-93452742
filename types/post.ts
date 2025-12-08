export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  readingMinutes: number;
  author: string;
  views: number;
}