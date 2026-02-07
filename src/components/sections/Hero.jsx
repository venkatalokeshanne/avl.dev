import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-3xl mx-auto w-full pt-24 md:pt-0">
        {/* Terminal prompt */}
        <div className="font-mono text-sm mb-8 space-y-1">
          <p className="text-chalk/60">
            <span className="text-accent">$</span> whoami
          </p>
          <p className="text-chalk/70">
            <span className="text-leaf">→</span> {t('hero.terminal_response')}
          </p>
          <p className="text-chalk/60">
            <span className="text-accent">$</span> cat status.txt
          </p>
          <p className="text-chalk/70">
            <span className="text-leaf">→</span>{' '}
            <span className="text-accent">{t('hero.status')}</span>
          </p>
        </div>

        <h1>
          {t('hero.greeting')}{' '}
          <span className="text-accent">{t('hero.name')}</span>
          <span className="text-muted font-light">.</span>
        </h1>

        <p className="text-chalk/90 text-lg md:text-xl mt-5 leading-relaxed max-w-xl">
          {t('hero.role')}
        </p>
        <p className="text-chalk/70 text-base mt-3 leading-relaxed max-w-xl">
          {t('hero.tagline')}
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-8 mt-10 font-mono text-xs text-chalk/60">
          <div>
            <span className="text-accent text-lg font-semibold block font-sans">7+</span>
            {t('hero.stat_years')}
          </div>
          <div>
            <span className="text-ember text-lg font-semibold block font-sans">20+</span>
            {t('hero.stat_projects')}
          </div>
          <div>
            <span className="text-leaf text-lg font-semibold block font-sans">∞</span>
            {t('hero.stat_coffee')}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-6 mt-10 font-mono text-sm">
          <Link
            href="/#contact"
            className="text-ink bg-accent hover:bg-accent/90 px-5 py-2 rounded-lg transition-colors font-medium"
          >
            {t('hero.cta_hello')} →
          </Link>
          <Link
            href="/work"
            className="text-accent border border-accent/30 hover:border-accent/60 px-5 py-2 rounded-lg transition-colors"
          >
            {t('hero.cta_work')} →
          </Link>
          <Link
            href="/#about"
            className="text-muted hover:text-chalk transition-colors"
          >
            ↓ {t('hero.cta_scroll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
