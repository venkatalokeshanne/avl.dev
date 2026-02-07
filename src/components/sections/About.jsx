import { useTranslation } from 'next-i18next';

export default function About() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6" id="about">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('about.comment')}</p>
        <h2>{t('about.heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 mt-8">
          {/* Main description */}
          <div className="space-y-4">
            <p className="text-chalk/70 leading-relaxed text-base">
              {t('about.description')}
            </p>
            <p className="text-chalk/65 leading-relaxed text-base">
              {t('about.experience')}
            </p>
            <p className="text-chalk/60 leading-relaxed text-base">
              {t('about.personal')}
            </p>
          </div>

          {/* Side card — quick facts */}
          <div className="bg-paper border border-[var(--border)] rounded-lg p-5 font-mono text-sm h-fit">
            <p className="text-muted text-xs mb-3 uppercase tracking-wider">{t('about.quick_facts')}</p>
            <div className="space-y-2.5 text-chalk/70">
              <p>
                <span className="text-accent">name</span>
                <span className="text-muted/60">{' → '}</span>
                {t('about.fact_name')}
              </p>
              <p>
                <span className="text-sky">role</span>
                <span className="text-muted/60">{' → '}</span>
                {t('about.fact_role')}
              </p>
              <p>
                <span className="text-leaf">based</span>
                <span className="text-muted/60">{' → '}</span>
                {t('about.fact_location')}
              </p>
              <p>
                <span className="text-ember">focus</span>
                <span className="text-muted/60">{' → '}</span>
                {t('about.fact_focus')}
              </p>
              <p>
                <span className="text-accent">langs</span>
                <span className="text-muted/60">{' → '}</span>
                {t('about.fact_langs')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
