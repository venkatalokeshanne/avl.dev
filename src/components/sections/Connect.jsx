import { useTranslation } from 'next-i18next';

const socials = [
  { name: 'GitHub', url: 'https://github.com/venkatalokeshanne', icon: '◆' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/venkatalokesh', icon: '◇' },
  { name: 'Email', url: 'mailto:annevlokesh@gmail.com', icon: '◈' },
  { name: 'Portfolio', url: 'https://www.devotree.in', icon: '◉' },
];

export default function Connect() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('connect.comment')}</p>
        <h2>{t('connect.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-8">
          {t('connect.description')}
        </p>

        {/* Availability status */}
        <div className="inline-flex items-center gap-2 bg-paper border border-[var(--border)] rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
          <span className="text-sm font-mono text-muted">
            {t('connect.availability')}
          </span>
        </div>

        {/* Social links as terminal commands */}
        <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
            <span className="text-muted text-xs ml-2">connect.sh</span>
          </div>

          <div className="space-y-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-accent transition-colors group"
              >
                <span className="text-accent">$</span>
                <span>open</span>
                <span className="text-chalk/80 group-hover:text-accent transition-colors">
                  {s.name.toLowerCase()}
                </span>
                <span className="text-muted/50 hidden md:inline ml-auto">
                  {s.url.replace('https://', '').replace('mailto:', '')}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick response note */}
        <p className="text-muted/60 text-xs font-mono mt-6">
          {t('connect.response_time')}
        </p>
      </div>
    </section>
  );
}
