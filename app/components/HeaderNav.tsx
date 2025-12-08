import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/tags/nextjs', label: 'Tags' },
];

function HeaderNav(): JSX.Element {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-blue-700 transition hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Go to homepage"
        >
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          Modern Blog
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/#newsletter"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderNav;