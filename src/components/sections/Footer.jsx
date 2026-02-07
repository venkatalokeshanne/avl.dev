import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="py-16 md:py-20 px-6 border-t border-[var(--border)]">
      <div className="max-w-3xl mx-auto">
        <p className="comment">{t('footer.wip')}</p>
        <h2 className="mt-3">{t('footer.thanks')}</h2>

        <div className="flex flex-wrap gap-6 mt-8 font-mono text-sm">
          <Link
            href="/about"
            className="text-accent hover:text-ember transition-colors"
          >
            → {t('footer.about')}
          </Link>
          <Link
            href="/work"
            className="text-muted hover:text-chalk transition-colors"
          >
            → {t('footer.work')}
          </Link>
        </div>

        <p className="text-muted/60 text-xs mt-16 font-mono">
          &copy; {new Date().getFullYear()} Venkata Anne · built with
          next.js + tailwind
        </p>
      </div>
    </footer>
  );
}
