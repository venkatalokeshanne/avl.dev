import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: '.home()' },
  { href: '/work', label: '.work()' },
  { href: '/blog', label: '.blog()' },
  { href: '/about', label: '.about()' },
  { href: '/#contact', label: '.contact()' },
];

export default function Layout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar ───────────────────────────────────── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-3' : 'py-5'
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm tracking-tight hover:opacity-70 transition-opacity"
          >
            <span className="text-accent">~/</span>
            <span className="text-chalk">venkata</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 ${
                  router.pathname === link.href
                    ? 'text-accent'
                    : 'text-muted hover:text-chalk'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <span className="text-muted/50 mx-2 select-none">|</span>

            <ThemeToggle />

            <span className="text-muted/50 mx-1 select-none">|</span>

            <Link
              href="/"
              locale={router.locale === 'en' ? 'fr' : 'en'}
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              {router.locale === 'en' ? 'fr' : 'en'}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-7 h-7 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-4 h-px bg-chalk transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-4 h-px bg-chalk transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-4 h-px bg-chalk transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 menu-mobile h-full flex flex-col justify-center items-center transition-all duration-300 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-2xl text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-10">
          <ThemeToggle />
          <Link
            href="/"
            locale={router.locale === 'en' ? 'fr' : 'en'}
            onClick={() => setMenuOpen(false)}
            className="font-mono text-sm text-muted hover:text-accent transition-colors"
          >
            {router.locale === 'en' ? 'switch to français' : 'switch to english'}
          </Link>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      {children}
    </>
  );
}
