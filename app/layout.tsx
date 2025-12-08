import type { Metadata } from 'next';
import './globals.css';
import HeaderNav from './components/HeaderNav';

export const metadata: Metadata = {
  title: 'Modern Personal Blog',
  description: 'A feature-rich personal blog powered by Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow-md"
        >
          Skip to content
        </a>
        <HeaderNav />
        <div id="main-content" className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}