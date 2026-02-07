import { useTranslation } from 'next-i18next';

const values = [
  { key: 'clean_code', icon: '◇', color: 'accent' },
  { key: 'ship_it', icon: '▸', color: 'ember' },
  { key: 'keep_learning', icon: '↻', color: 'sky' },
  { key: 'user_first', icon: '◉', color: 'leaf' },
];

export default function Philosophy() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('philosophy.comment')}</p>
        <h2>{t('philosophy.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-10">
          {t('philosophy.description')}
        </p>

        {/* Code-block style values */}
        <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
            <span className="text-muted text-xs ml-2">my values</span>
          </div>

          <div className="space-y-5">
            {values.map((v, i) => (
              <div key={v.key} className="flex gap-3">
                <span className={`text-${v.color} text-base mt-0.5`}>{v.icon}</span>
                <div>
                  <p className={`text-${v.color} font-medium text-sm`}>
                    {t(`philosophy.${v.key}.title`)}
                  </p>
                  <p className="text-chalk/55 text-xs leading-relaxed mt-1">
                    {t(`philosophy.${v.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
